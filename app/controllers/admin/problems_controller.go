package admin

import (
	"goerrbit/app/models"
	"goerrbit/app/serializers"

	"github.com/gopsql/pagination"
	"github.com/labstack/echo/v4"
)

type problemsCtrl baseCtrl

func init() {
	controllers = append(controllers, problemsCtrl{})
}

func (c problemsCtrl) init(g *echo.Group) {
	g.GET("/apps/:app_id/problems", c.list)
	g.GET("/apps/:app_id/problems/:id", c.show)
}

func (ctrl problemsCtrl) list(c echo.Context) error {
	app := ctrl.findApp(c)
	q := pagination.Query{
		MaxPer:     50,
		DefaultPer: 20,
	}
	c.Bind(&q)
	cond := "WHERE app_id = $1"
	qt, qa := q.GetQuery()
	if qt != "" {
		cond += " AND (message ILIKE $2 OR error_class ILIKE $2 OR location ILIKE $2)"
	}
	count := c.(Ctx).ModelProblem.MustCount(append([]interface{}{cond, app.Id}, qa...)...)
	problems := []models.Problem{}
	sql := cond + " ORDER BY last_notice_at DESC " + q.LimitOffset()
	c.(Ctx).ModelProblem.Find(append([]interface{}{sql, app.Id}, qa...)...).MustQuery(&problems)
	p := []serializers.AdminProblem{}
	for _, problem := range problems {
		p = append(p, serializers.NewAdminProblem(problem))
	}
	return c.JSON(200, struct {
		Problems   []serializers.AdminProblem
		Pagination pagination.Result
	}{p, q.Result(count)})
}

func (ctrl problemsCtrl) show(c echo.Context) error {
	app := ctrl.findApp(c)
	var problem models.Problem
	c.(Ctx).ModelProblem.Find("WHERE app_id = $1 AND id = $2", app.Id, c.Param("id")).MustQuery(&problem)
	return c.JSON(200, struct {
		Problem serializers.AdminProblem
	}{serializers.NewAdminProblem(problem)})
}

func (_ problemsCtrl) findApp(c echo.Context) (app models.App) {
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("app_id")).MustQuery(&app)
	return
}
