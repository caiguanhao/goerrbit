package admin

import (
	"fmt"
	"strings"
	"time"

	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/caiguanhao/goerrbit/app/serializers"
	"github.com/gopsql/pagination/v2"
	"github.com/labstack/echo/v4"
)

type problemsCtrl baseCtrl

func init() {
	controllers = append(controllers, problemsCtrl{})
}

func (c problemsCtrl) init(g *echo.Group) {
	g.GET("/problems", c.list)
	g.GET("/apps/:app_id/problems", c.list)
	g.GET("/apps/:app_id/problems/:id", c.show)
	g.PUT("/apps/:app_id/problems/:id/resolve", c.resolve)
	g.POST("/problems/resolve", c.resolveMultiple)
	g.POST("/problems/unresolve", c.unresolveMultiple)
	g.POST("/problems/merge", c.merge, UserMustBeAdmin)
	g.POST("/problems/unmerge", c.unmerge, UserMustBeAdmin)
	g.DELETE("/problems", c.destroy, UserMustBeAdmin)
}

func (ctrl problemsCtrl) list(c echo.Context) error {
	q := pagination.PaginationQuerySort{
		pagination.Pagination{
			MaxPer:     50,
			DefaultPer: 20,
		},
		pagination.Query{},
		pagination.Sort{
			AllowedSorts: []string{
				"message",
				"last_notice_at",
				"notices_count",
			},
			DefaultSort:  "last_notice_at",
			DefaultOrder: "desc",
		},
	}
	c.Bind(&q)

	var includeApps bool
	var cond []string
	var args []interface{}
	if c.Param("app_id") == "" {
		includeApps = true
	} else {
		app := ctrl.findApp(c)
		cond = append(cond, "app_id = $?")
		args = append(args, app.Id)
	}
	if pattern := q.GetLikePattern(); pattern != "" {
		cond = append(cond, "(message ILIKE $? OR error_class ILIKE $? OR location ILIKE $?)")
		args = append(args, pattern)
	}
	if env := c.QueryParam("environment"); env != "" {
		cond = append(cond, "environment = $?")
		args = append(args, env)
	}
	if c.QueryParam("status") == "resolved" {
		cond = append(cond, "resolved_at IS NOT NULL")
	} else {
		cond = append(cond, "resolved_at IS NULL")
	}

	var sql string
	if len(cond) > 0 {
		for i := range cond {
			cond[i] = strings.Replace(cond[i], "$?", fmt.Sprintf("$%d", i+1), -1)
		}
		sql = "WHERE " + strings.Join(cond, " AND ")
	}

	count := c.(Ctx).ModelProblem.MustCount(append([]interface{}{sql}, args...)...)
	problems := []models.Problem{}
	sql = sql + " " + q.OrderByLimitOffset()
	c.(Ctx).ModelProblem.Find(append([]interface{}{sql}, args...)...).MustQuery(&problems)
	p := []serializers.AdminProblem{}
	appIds := []int{}
	problemIds := []int{}
	for _, problem := range problems {
		p = append(p, serializers.NewAdminProblem(problem))
		appIds = appendIfMissing(appIds, problem.AppId)
		problemIds = append(problemIds, problem.Id)
	}
	a := []serializers.AdminAppSimple{}
	if includeApps && len(appIds) > 0 {
		var apps []models.App
		c.(Ctx).ModelApp.Find("WHERE id = ANY($1)", appIds).MustQuery(&apps)
		for _, app := range apps {
			a = append(a, serializers.NewAdminAppSimple(app))
		}
	}

	comments := []struct {
		ProblemId int
		UserName  *string
		Body      string
	}{}
	if len(problemIds) > 0 {
		c.(Ctx).Model.NewSQLWithValues(
			"SELECT DISTINCT ON (problem_id) problem_id, users.name, SUBSTRING(body, 0, 100) FROM comments "+
				"LEFT JOIN users ON users.id = comments.user_id "+
				"WHERE problem_id = ANY($1) ORDER BY problem_id, comments.created_at ASC",
			problemIds,
		).MustQuery(&comments)
	}

	return c.JSON(200, struct {
		Problems   []serializers.AdminProblem
		Apps       []serializers.AdminAppSimple
		Comments   interface{}
		Pagination pagination.PaginationQuerySortResult
	}{p, a, comments, q.PaginationQuerySortResult(count)})
}

func (ctrl problemsCtrl) show(c echo.Context) error {
	app := ctrl.findApp(c)
	var problem models.Problem
	c.(Ctx).ModelProblem.Find("WHERE app_id = $1 AND id = $2", app.Id, c.Param("id")).MustQuery(&problem)
	return c.JSON(200, struct {
		Problem serializers.AdminProblem
	}{serializers.NewAdminProblem(problem)})
}

func (ctrl problemsCtrl) resolve(c echo.Context) error {
	app := ctrl.findApp(c)
	p := c.(Ctx).ModelProblem
	p.Update(
		"ResolvedAt", time.Now(),
	)("WHERE app_id = $1 AND id = $2", app.Id, c.Param("id")).MustExecute()
	return ctrl.show(c)
}

func (ctrl problemsCtrl) resolveMultiple(c echo.Context) error {
	n := time.Now()
	return ctrl.setResolvedAt(c, &n)
}

func (ctrl problemsCtrl) unresolveMultiple(c echo.Context) error {
	return ctrl.setResolvedAt(c, nil)
}

func (problemsCtrl) setResolvedAt(c echo.Context, t *time.Time) error {
	var req struct {
		Ids []int `json:"ids"`
	}
	c.Bind(&req)
	ids := []int{}
	if len(req.Ids) > 0 {
		p := c.(Ctx).ModelProblem
		p.Update(
			"ResolvedAt", t,
		)("WHERE id = ANY($1) RETURNING id", req.Ids).MustQuery(&ids)
	}
	return c.JSON(200, struct {
		Changed []int
	}{ids})
}

func (problemsCtrl) merge(c echo.Context) error {
	need2problems := func() error { return c.JSON(400, struct{ Message string }{"need 2 different problems"}) }
	var req struct {
		Ids []int `json:"ids"`
	}
	c.Bind(&req)
	if len(req.Ids) < 2 {
		return need2problems()
	}
	var problems []models.Problem
	p := c.(Ctx).ModelProblem
	p.Find("WHERE id = ANY($1) ORDER BY last_notice_at DESC", req.Ids).MustQuery(&problems)
	if len(problems) < 2 {
		return need2problems()
	}
	mergedProblem := problems[0]
	childProblems := problems[1:]
	var childProblemIds []int
	for _, problem := range childProblems {
		childProblemIds = append(childProblemIds, problem.Id)
	}
	n := c.(Ctx).ModelNotice
	n.NewSQLWithValues(
		"UPDATE notices SET meta = jsonb_set(meta, '{old_problem_id}', to_jsonb(problem_id)) "+
			"WHERE problem_id = ANY($1)", childProblemIds,
	).MustExecute()
	n.Update(
		"ProblemId", mergedProblem.Id,
	)("WHERE problem_id = ANY($1)", childProblemIds).MustExecute()
	p.Delete("WHERE id = ANY($1)", childProblemIds).MustExecute()
	c.(Ctx).RecacheProblem(mergedProblem)
	return c.NoContent(204)
}

func (ctrl problemsCtrl) unmerge(c echo.Context) error {
	var req struct {
		Ids []int `json:"ids"`
	}
	c.Bind(&req)

	var problems []models.Problem
	p := c.(Ctx).ModelProblem
	p.Find("WHERE id = ANY($1)", req.Ids).MustQuery(&problems)

	unmerged := 0
	for _, problem := range problems {
		if ctrl.unmergeProblem(c, problem) == false {
			continue
		}
		unmerged += 1
	}

	return c.JSON(200, struct {
		Unmerged int
	}{unmerged})
}

func (problemsCtrl) unmergeProblem(c echo.Context, problem models.Problem) bool {
	p := c.(Ctx).ModelProblem
	n := c.(Ctx).ModelNotice
	var app models.App
	c.(Ctx).ModelApp.Find("WHERE id = $1", problem.AppId).MustQuery(&app)
	var notices []models.Notice
	n.Find("WHERE problem_id = $1 ORDER BY created_at ASC", problem.Id).MustQuery(&notices)
	noticesById := map[int][]int{}
	fingerprintById := map[int]string{}
	for _, notice := range notices {
		if notice.OldProblemId == 0 {
			continue
		}
		noticesById[notice.OldProblemId] = append(noticesById[notice.OldProblemId], notice.Id)
		if fingerprintById[notice.OldProblemId] == "" {
			fingerprintById[notice.OldProblemId] = app.GenerateFingerprint(notice)
		}
	}
	if len(noticesById) == 0 {
		return false
	}
	for i, ids := range noticesById {
		var newProblemId int
		p.Insert(
			"AppId", problem.AppId,
			"Fingerprint", fingerprintById[i],
			"ErrorClass", problem.ErrorClass,
			"Environment", problem.Environment,
			"ResolvedAt", nil,
			"LastNoticeId", ids[len(ids)-1],
		)("RETURNING id").MustQueryRow(&newProblemId)
		var newProblem models.Problem
		p.Find("WHERE id = $1", newProblemId).MustQuery(&newProblem)
		n.Update(
			"ProblemId", newProblem.Id,
		)("WHERE id = ANY($1)", ids).MustExecute()
		n.NewSQLWithValues(
			"UPDATE notices SET meta = meta - 'old_problem_id' "+
				"WHERE id = ANY($1)", ids,
		).MustExecute()
		c.(Ctx).RecacheProblem(newProblem)
	}
	c.(Ctx).RecacheProblem(problem)
	return true
}

func (problemsCtrl) destroy(c echo.Context) error {
	var req struct {
		Ids []int `json:"ids"`
	}
	c.Bind(&req)
	var noticesDeleted int
	var commentsDeleted int
	ids := []int{}
	if len(req.Ids) > 0 {
		c.(Ctx).ModelNotice.Delete("WHERE problem_id = ANY($1)", req.Ids).MustExecute(&noticesDeleted)
		c.(Ctx).ModelComment.Delete("WHERE problem_id = ANY($1)", req.Ids).MustExecute(&commentsDeleted)
		c.(Ctx).ModelProblem.Delete("WHERE id = ANY($1) RETURNING id", req.Ids).MustQuery(&ids)
	}
	return c.JSON(200, struct {
		Deleted         []int
		ProblemsDeleted int
		NoticesDeleted  int
		CommentsDeleted int
	}{ids, len(ids), noticesDeleted, commentsDeleted})
}

func (_ problemsCtrl) findApp(c echo.Context) (app models.App) {
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("app_id")).MustQuery(&app)
	return
}

func appendIfMissing(slice []int, s int) []int {
	for _, ele := range slice {
		if ele == s {
			return slice
		}
	}
	return append(slice, s)
}
