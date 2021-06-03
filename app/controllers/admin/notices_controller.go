package admin

import (
	"strings"

	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/caiguanhao/goerrbit/app/serializers"
	"github.com/labstack/echo/v4"
)

type noticesCtrl baseCtrl

func init() {
	controllers = append(controllers, noticesCtrl{})
}

func (c noticesCtrl) init(g *echo.Group) {
	g.GET("/apps/:app_id/problems/:problem_id/notices", c.list)
	g.GET("/apps/:app_id/problems/:problem_id/notices/:id", c.show)
	g.GET("/apps/:app_id/problems/:problem_id/notices/:id/nav", c.nav)
}

func (ctrl noticesCtrl) list(c echo.Context) error {
	_, problem := ctrl.findAppProblem(c)
	notices := []models.Notice{}
	c.(Ctx).ModelNotice.Find("WHERE problem_id = $1", problem.Id).MustQuery(&notices)
	return c.JSON(200, struct {
		Notices []models.Notice
	}{notices})
}

func (ctrl noticesCtrl) show(c echo.Context) error {
	_, problem := ctrl.findAppProblem(c)
	var notice models.Notice
	c.(Ctx).ModelNotice.Find("WHERE problem_id = $1 AND id = $2", problem.Id, c.Param("id")).MustQuery(&notice)
	return c.JSON(200, struct {
		Notice serializers.AdminNotice
	}{serializers.NewAdminNotice(notice)})
}

func (ctrl noticesCtrl) nav(c echo.Context) error {
	_, problem := ctrl.findAppProblem(c)
	var nav struct {
		Number *int
		Older  *int
		Newer  *int
	}
	sql := `SELECT number, older, newer from (
SELECT id, ROW_NUMBER() OVER (ORDER BY id ASC) number,
LEAD(notices.id) OVER (order BY id DESC) older,
LAG(notices.id) OVER (ORDER BY id DESC) newer FROM notices WHERE problem_id = $1
) a WHERE id = $2`
	sql = strings.Replace(sql, "\n", " ", -1)
	c.(Ctx).ModelNotice.NewSQLWithValues(sql, problem.Id, c.Param("id")).
		MustQueryRow(&nav.Number, &nav.Older, &nav.Newer)
	return c.JSON(200, struct {
		Nav interface{}
	}{nav})
}

func (_ noticesCtrl) findAppProblem(c echo.Context) (app models.App, problem models.Problem) {
	c.(Ctx).ModelApp.Find("WHERE id = $1", c.Param("app_id")).MustQuery(&app)
	c.(Ctx).ModelProblem.Find("WHERE app_id = $1 AND id = $2", app.Id, c.Param("problem_id")).MustQuery(&problem)
	return
}
