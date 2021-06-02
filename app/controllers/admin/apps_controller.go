package admin

import (
	"goerrbit/app/models"
	"goerrbit/app/serializers"

	"github.com/labstack/echo/v4"
)

type appsCtrl baseCtrl

func init() {
	controllers = append(controllers, appsCtrl{})
}

func (c appsCtrl) init(g *echo.Group) {
	g.GET("/apps", c.list)
	g.GET("/apps/:id", c.show)
	g.POST("/apps", c.create)
	g.PUT("/apps/:id", c.update)
}

func (_ appsCtrl) list(c echo.Context) error {
	apps := []models.App{}
	c.(Ctx).ModelApp.Find("ORDER BY created_at DESC").MustQuery(&apps)
	var appIds []int
	for _, app := range apps {
		appIds = append(appIds, app.Id)
	}
	count := map[int]int{}
	if len(appIds) > 0 {
		c.(Ctx).ModelProblem.Select("app_id, COUNT(*)",
			"WHERE app_id = ANY($1) GROUP BY app_id", appIds).MustQuery(&count)
	}
	res := struct {
		Apps []serializers.AdminApp
	}{}
	for _, app := range apps {
		a := serializers.NewAdminApp(app)
		a.ProblemsCount = count[a.Id]
		res.Apps = append(res.Apps, a)
	}
	return c.JSON(200, res)
}

func (_ appsCtrl) show(c echo.Context) error {
	var app models.App
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("id")).MustQuery(&app)
	a := serializers.NewAdminAppDetails(app)
	a.ProblemsCount = c.(Ctx).ModelProblem.MustCount("WHERE app_id = $1", app.Id)
	return c.JSON(200, struct {
		App serializers.AdminAppDetails
	}{a})
}

func (ctrl appsCtrl) create(c echo.Context) error {
	var app models.App
	var id int
	m := c.(Ctx).ModelApp
	changes := m.MustAssign(
		&app,
		m.Permit(ctrl.params()...).Filter(c.Request().Body),
		m.CreatedAt(),
		m.UpdatedAt(),
	)
	c.(Ctx).MustValidate(app)
	m.Insert(changes...)("RETURNING id").MustQueryRow(&id)
	m.Find("WHERE id = $1", id).MustQuery(&app)
	return c.JSON(200, struct{ App models.App }{app})
}

func (ctrl appsCtrl) update(c echo.Context) error {
	var app models.App
	id := c.Param("id")
	m := c.(Ctx).ModelApp
	changes := m.MustAssign(
		&app,
		m.Permit(ctrl.params()...).Filter(c.Request().Body),
		m.UpdatedAt(),
	)
	c.(Ctx).MustValidate(app)
	m.Update(changes...)("WHERE id = $1", id).MustExecute()
	m.Find("WHERE id = $1", id).MustQuery(&app)
	return c.JSON(200, struct{ App models.App }{app})
}

func (appsCtrl) params() []string {
	return []string{
		"Name", "ApiKey", "Fingerprinter",
	}
}
