package admin

import (
	"reflect"

	"github.com/caiguanhao/goerrbit/app/controllers/shared"
	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/caiguanhao/goerrbit/app/serializers"
	"github.com/caiguanhao/goerrbit/plugins"
	"github.com/gopsql/psql"
	"github.com/labstack/echo/v4"
)

type nsCtrl baseCtrl

func init() {
	controllers = append(controllers, nsCtrl{})
}

func (c nsCtrl) init(g *echo.Group) {
	g.GET("/notification-services", c.list)
	g.GET("/notification-services/related", c.related)
	g.GET("/apps/:id/notification-services", c.listApp)
	g.POST("/apps/:id/notification-services", c.addOrUpdate, UserMustBeAdmin)
	g.POST("/apps/:id/notification-services/related", c.copySettings, UserMustBeAdmin)
	g.DELETE("/apps/:id/notification-services", c.remove, UserMustBeAdmin)
	g.PATCH("/apps/:id/notification-services", c.toggle, UserMustBeAdmin)
	g.PUT("/apps/:id/notification-services", c.test, UserMustBeAdmin)
}

func (_ nsCtrl) list(c echo.Context) error {
	return c.JSON(200, struct {
		NotificatinonServices plugins.Plugins
	}{c.Get("Services").(plugins.Plugins)})
}

func (_ nsCtrl) related(c echo.Context) error {
	appIds := []int{}
	c.(Ctx).ModelNotificationService.Select("app_id",
		"WHERE name = $1 AND app_id != $2",
		c.QueryParam("Name"), c.QueryParam("AppId")).MustQuery(&appIds)
	var apps []models.App
	c.(Ctx).ModelApp.Find("WHERE id = ANY($1) ORDER BY id ASC", appIds).MustQuery(&apps)
	a := []serializers.AdminAppSimple{}
	for _, app := range apps {
		a = append(a, serializers.NewAdminAppSimple(app))
	}
	return c.JSON(200, struct {
		Apps []serializers.AdminAppSimple
	}{a})
}

func (_ nsCtrl) listApp(c echo.Context) error {
	var app models.App
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("id")).MustQuery(&app)
	services := []models.NotificationService{}
	c.(Ctx).ModelNotificationService.Find("WHERE app_id = $1 ORDER BY created_at ASC", app.Id).MustQuery(&services)
	nss := []serializers.AdminNotificationService{}
	for _, s := range services {
		plugin := c.Get("Services").(plugins.Plugins).FindByName(s.Name)
		if plugin == nil {
			continue
		}
		s.ProtectOptions(plugin.New.ProtectedFields()...)
		nss = append(nss, serializers.NewAdminNotificationService(s))
	}
	return c.JSON(200, struct {
		NotificatinonServices []serializers.AdminNotificationService
	}{nss})
}

func (ctrl nsCtrl) addOrUpdate(c echo.Context) error {
	var app models.App
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("id")).MustQuery(&app)
	var ns models.NotificationService
	ns.AppId = app.Id
	m := c.(Ctx).ModelNotificationService
	m.MustAssign(
		&ns,
		m.Permit("Name", "Options").Filter(c.Request().Body),
	)
	c.(Ctx).MustValidate(ns)

	service := c.Get("Services").(plugins.Plugins).FindByName(ns.Name)
	if service == nil {
		return c.JSON(404, shared.ValidationErrors{
			Errors: []shared.ValidationError{{
				FullName: "Name",
				Name:     "Name",
				Kind:     "string",
				Type:     "notfound",
				Param:    "",
			}},
		})
	}

	var existing []models.NotificationService
	m.Find("WHERE app_id = $1 AND name = $2", ns.AppId, ns.Name).MustQuery(&existing)

	instance := reflect.New(reflect.TypeOf(service.New()))
	mx := psql.NewModel(instance.Elem().Interface())
	if len(existing) > 0 {
		mx.MustAssign(
			instance.Interface(),
			mx.PermitAllExcept().Filter(existing[0].Options),
		)
	}
	mx.MustAssign(
		instance.Interface(),
		mx.PermitAllExcept().Filter(ns.Options),
	)
	c.(Ctx).MustValidate(instance.Elem().Interface())
	ns.Options = instance.Elem().Interface()
	if len(existing) > 0 {
		m.Update(
			m.Permit("Options").Filter(ns),
		)("WHERE app_id = $1 AND name = $2", ns.AppId, ns.Name).MustExecute()
	} else {
		ns.Enabled = true
		m.Insert(
			m.Permit("AppId", "Name", "Options", "Enabled").Filter(ns),
		)().MustExecute()
	}

	return ctrl.listApp(c)
}

func (ctrl nsCtrl) copySettings(c echo.Context) error {
	var app models.App
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("id")).MustQuery(&app)
	var req struct {
		From int
		Name string
	}
	c.Bind(&req)
	m := c.(Ctx).ModelNotificationService
	var ns models.NotificationService
	m.Find("WHERE app_id = $1 AND name = $2", req.From, req.Name).MustQuery(&ns)
	if m.MustExists("WHERE app_id = $1 AND name = $2", app.Id, ns.Name) {
		m.Update(
			m.Permit("Options").Filter(ns),
		)("WHERE app_id = $1 AND name = $2", app.Id, ns.Name).MustExecute()
	} else {
		ns.AppId = app.Id
		ns.Enabled = true
		m.Insert(
			m.Permit("AppId", "Name", "Options", "Enabled").Filter(ns),
		)().MustExecute()
	}
	return ctrl.listApp(c)
}

func (ctrl nsCtrl) remove(c echo.Context) error {
	var app models.App
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("id")).MustQuery(&app)
	var req struct {
		Name string
	}
	c.Bind(&req)
	if req.Name != "" {
		m := c.(Ctx).ModelNotificationService
		m.Delete("WHERE app_id = $1 AND name = $2", app.Id, req.Name).MustExecute()
	}
	return ctrl.listApp(c)
}

func (ctrl nsCtrl) toggle(c echo.Context) error {
	var app models.App
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("id")).MustQuery(&app)
	var req struct {
		Name string
	}
	c.Bind(&req)
	if req.Name != "" {
		m := c.(Ctx).ModelNotificationService
		m.NewSQLWithValues(
			"UPDATE notification_services SET enabled = NOT enabled WHERE app_id = $1 AND name = $2",
			app.Id, req.Name,
		).MustExecute()
	}
	return ctrl.listApp(c)
}

func (ctrl nsCtrl) test(c echo.Context) error {
	var req struct {
		Name string
	}
	c.Bind(&req)
	var app models.App
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("id")).MustQuery(&app)
	var problem models.Problem
	c.(Ctx).ModelProblem.Find("WHERE app_id = $1 ORDER BY last_notice_at DESC", app.Id).MustQuery(&problem)
	var ns models.NotificationService
	c.(Ctx).ModelNotificationService.Find("WHERE app_id = $1 AND name = $2", app.Id, req.Name).MustQuery(&ns)
	notification := serializers.NewNotification(app, problem, c.(Ctx).Configs.Prefix)
	service := c.Get("Services").(plugins.Plugins).FindByName(req.Name)
	err := service.CreateNotification(ns.Options, notification)
	if err != nil {
		return c.JSON(500, struct {
			Message string
		}{err.Error()})
	}
	return c.NoContent(204)
}
