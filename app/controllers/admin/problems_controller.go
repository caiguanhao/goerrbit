package admin

import (
	"goerrbit/app/models"
	"goerrbit/app/serializers"

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
	problems := []models.Problem{}
	c.(Ctx).ModelProblem.Find("WHERE app_id = $1", app.Id).MustQuery(&problems)
	return c.JSON(200, struct {
		Problems []models.Problem
	}{problems})
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
