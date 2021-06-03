package admin

import (
	"fmt"
	"goerrbit/app/models"
	"goerrbit/app/serializers"
	"strings"
	"time"

	"github.com/gopsql/pagination"
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
}

func (ctrl problemsCtrl) list(c echo.Context) error {
	q := pagination.Query{
		MaxPer:     50,
		DefaultPer: 20,
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
	qt, qa := q.GetQuery()
	if qt != "" {
		cond = append(cond, "(message ILIKE $? OR error_class ILIKE $? OR location ILIKE $?)")
		args = append(args, qa...)
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
	sql = sql + " ORDER BY last_notice_at DESC " + q.LimitOffset()
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
		Pagination pagination.Result
	}{p, a, q.Result(count)})
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
