package admin

import (
	"goerrbit/app/models"

	"github.com/labstack/echo/v4"
)

type appsCtrl baseCtrl

func init() {
	controllers = append(controllers, appsCtrl{})
}

func (c appsCtrl) init(g *echo.Group) {
	g.GET("/apps", c.list)
	g.GET("/apps/:id", c.show)
}

func (_ appsCtrl) list(c echo.Context) error {
	apps := []models.App{}
	c.(Ctx).ModelApp.Find().MustQuery(&apps)
	return c.JSON(200, struct {
		Apps []models.App
	}{apps})
}

func (_ appsCtrl) show(c echo.Context) error {
	var app models.App
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("id")).MustQuery(&app)
	return c.JSON(200, struct {
		App models.App
	}{app})
}
