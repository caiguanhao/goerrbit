package admin

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/caiguanhao/goerrbit/app/serializers"
	"github.com/gopsql/pagination/v2"
	"github.com/labstack/echo/v4"
)

type appsCtrl baseCtrl

func init() {
	controllers = append(controllers, appsCtrl{})
}

func (c appsCtrl) init(g *echo.Group) {
	g.GET("/apps", c.list)
	g.GET("/apps/:id", c.show)
	g.POST("/apps", c.create, UserMustBeAdmin)
	g.PUT("/apps/:id", c.update, UserMustBeAdmin)
}

func (_ appsCtrl) list(c echo.Context) error {
	q := pagination.PaginationQuerySort{
		pagination.Pagination{
			MaxPer:     50,
			DefaultPer: 20,
		},
		pagination.Query{},
		pagination.Sort{
			AllowedSorts: []string{
				"name",
			},
			DefaultSort:  "name",
			DefaultOrder: "asc",
		},
	}
	c.Bind(&q)

	var cond []string
	var args []interface{}
	if pattern := q.GetLikePattern(); pattern != "" {
		cond = append(cond, "name ILIKE $?")
		args = append(args, pattern)
	}

	var sql string
	if len(cond) > 0 {
		for i := range cond {
			cond[i] = strings.Replace(cond[i], "$?", fmt.Sprintf("$%d", i+1), -1)
		}
		sql = "WHERE " + strings.Join(cond, " AND ")
	}

	count := c.(Ctx).ModelApp.MustCount(append([]interface{}{sql}, args...)...)
	apps := []models.App{}
	sql = sql + " " + q.OrderByLimitOffset()
	c.(Ctx).ModelApp.Find(append([]interface{}{sql}, args...)...).MustQuery(&apps)
	var appIds []int
	for _, app := range apps {
		appIds = append(appIds, app.Id)
	}
	problemsCount := map[int]int{}
	notificationServicesCount := map[int]map[string]int{}
	if len(appIds) > 0 {
		c.(Ctx).ModelProblem.Select("app_id, COUNT(*)",
			"WHERE app_id = ANY($1) AND resolved_at IS NULL GROUP BY app_id", appIds).MustQuery(&problemsCount)
		c.(Ctx).ModelNotificationService.Select("app_id, "+
			"jsonb_build_object('Enabled', COUNT(*) FILTER(WHERE enabled IS TRUE), "+
			"'Disabled', COUNT(*) FILTER(WHERE enabled IS FALSE))",
			"WHERE app_id = ANY($1) GROUP BY app_id", appIds).MustQuery(&notificationServicesCount)
	}
	res := struct {
		Apps       []serializers.AdminApp
		Pagination pagination.PaginationQuerySortResult
	}{}
	res.Apps = []serializers.AdminApp{}
	res.Pagination = q.PaginationQuerySortResult(count)
	for _, app := range apps {
		a := serializers.NewAdminApp(app)
		a.ProblemsCount = problemsCount[a.Id]
		a.NotificationServicesCount = notificationServicesCount[a.Id]
		res.Apps = append(res.Apps, a)
	}
	return c.JSON(200, res)
}

func (ctrl appsCtrl) show(c echo.Context) error {
	var app models.App
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("id")).MustQuery(&app)
	return ctrl.detailsApp(c, app)
}

func (ctrl appsCtrl) create(c echo.Context) error {
	var app models.App
	if c.Request().ContentLength == 0 {
		return ctrl.detailsApp(c, app)
	}
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
	return ctrl.detailsApp(c, app)
}

func (ctrl appsCtrl) update(c echo.Context) error {
	var app models.App
	app.Id, _ = strconv.Atoi(c.Param("id"))
	m := c.(Ctx).ModelApp
	changes := m.MustAssign(
		&app,
		m.Permit(ctrl.params()...).Filter(c.Request().Body),
		m.UpdatedAt(),
	)
	c.(Ctx).MustValidate(app)
	m.Update(changes...)("WHERE id = $1", app.Id).MustExecute()
	m.Find("WHERE id = $1", app.Id).MustQuery(&app)
	return ctrl.detailsApp(c, app)
}

func (appsCtrl) params() []string {
	return []string{
		"Name", "ApiKey", "Fingerprinter",
	}
}

func (ctrl appsCtrl) detailsApp(c echo.Context, app models.App) error {
	a := serializers.NewAdminAppDetails(app)
	if app.Id > 0 {
		a.ProblemsCount = c.(Ctx).ModelProblem.MustCount("WHERE app_id = $1 AND resolved_at IS NULL", app.Id)
		c.(Ctx).ModelNotificationService.Select(
			"jsonb_build_object('Enabled', COUNT(*) FILTER(WHERE enabled IS TRUE), "+
				"'Disabled', COUNT(*) FILTER(WHERE enabled IS FALSE))",
			"WHERE app_id = $1", app.Id).MustQueryRow(&a.NotificationServicesCount)

	}
	return c.JSON(200, struct {
		App serializers.AdminAppDetails
	}{a})
}
