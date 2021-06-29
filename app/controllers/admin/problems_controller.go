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
	for _, problem := range problems {
		p = append(p, serializers.NewAdminProblem(problem))
		appIds = appendIfMissing(appIds, problem.AppId)
	}
	a := []serializers.AdminAppSimple{}
	if includeApps && len(appIds) > 0 {
		var apps []models.App
		c.(Ctx).ModelApp.Find("WHERE id = ANY($1)", appIds).MustQuery(&apps)
		for _, app := range apps {
			a = append(a, serializers.NewAdminAppSimple(app))
		}
	}
	return c.JSON(200, struct {
		Problems   []serializers.AdminProblem
		Apps       []serializers.AdminAppSimple
		Pagination pagination.PaginationQuerySortResult
	}{p, a, q.PaginationQuerySortResult(count)})
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
		p.Changes(map[string]interface{}{
			"ResolvedAt": time.Now(),
		}),
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
			p.Changes(map[string]interface{}{
				"ResolvedAt": t,
			}),
		)("WHERE id = ANY($1) RETURNING id", req.Ids).MustQuery(&ids)
	}
	return c.JSON(200, struct {
		Changed []int
	}{ids})
}

func (ctrl problemsCtrl) destroy(c echo.Context) error {
	var req struct {
		Ids []int `json:"ids"`
	}
	c.Bind(&req)
	var noticesDeleted int
	ids := []int{}
	if len(req.Ids) > 0 {
		c.(Ctx).ModelNotice.Delete("WHERE problem_id = ANY($1)", req.Ids).MustExecute(&noticesDeleted)
		c.(Ctx).ModelProblem.Delete("WHERE id = ANY($1) RETURNING id", req.Ids).MustQuery(&ids)
	}
	return c.JSON(200, struct {
		Deleted         []int
		ProblemsDeleted int
		NoticesDeleted  int
	}{ids, len(ids), noticesDeleted})
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
