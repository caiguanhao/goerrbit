package apiv3

import (
	"crypto/md5"
	"fmt"
	"goerrbit/app/models"

	"github.com/labstack/echo/v4"
)

type noticesCtrl baseCtrl

func init() {
	controllers = append(controllers, noticesCtrl{})
}

func (c noticesCtrl) init(g *echo.Group) {
	g.POST("/projects/:id/notices", c.create)
}

func (_ noticesCtrl) create(c echo.Context) error {
	// find app
	a := c.(Ctx).ModelApp
	var app models.App
	err := a.Find("WHERE api_key = $1", c.Param("id")).Query(&app)
	if err == a.Connection().ErrNoRows() {
		return c.String(422, "Your API key is unknown")
	} else if err != nil {
		return err
	}

	// create error report from request json
	var report models.ErrorReport
	if err := c.Bind(&report); err != nil {
		return err
	}

	// find or create problem
	newNotice := report.MakeNotice()
	fingerprint := app.GenerateFingerprint(newNotice)
	p := c.(Ctx).ModelProblem
	if !p.MustExists("WHERE app_id = $1 AND fingerprint = $2", app.Id, fingerprint) {
		p.Insert(
			p.Changes(map[string]interface{}{
				"AppId":       app.Id,
				"Fingerprint": fingerprint,
			}),
		)().MustExecute()
	}
	var problem models.Problem
	p.Find("WHERE app_id = $1 AND fingerprint = $2", app.Id, fingerprint).MustQuery(&problem)
	newNotice.ProblemId = problem.Id

	// create notice
	var id int
	n := c.(Ctx).ModelNotice
	n.Insert(
		n.Permit(
			"ProblemId",
			"Message",
			"ErrorClass",
			"Backtraces",
			"Request",
			"ServerEnvironment",
			"Notifier",
			"UserAttributes",
			"Framework",
		).Filter(newNotice),
	)("RETURNING id").MustQueryRow(&id)
	var notice models.Notice
	n.Find("WHERE id = $1", id).MustQuery(&notice)

	// update cached fields of the problem
	p.Update(
		p.Changes(map[string]interface{}{
			"ErrorClass":   notice.ErrorClass,
			"Environment":  notice.EnvironmentName(),
			"LastNoticeAt": notice.CreatedAt,
			"LastNoticeId": notice.Id,
			"Message":      notice.Message,
			"ResolvedAt":   nil,
			"Location":     notice.Location(),
		}),
	)("WHERE id = $1", problem.Id).MustExecute()
	p.NewSQLWithValues("UPDATE problems SET notices_count = notices_count + 1 WHERE id = $1", problem.Id).MustExecute()
	sql := models.NewValueWithCountUpdateSQL("problems", "meta")
	ua, msg, host := notice.UserAgentString(), notice.Message, notice.Host()
	p.NewSQLWithValues(sql, problem.Id, "user_agents", md5String(ua), ua).MustExecute()
	p.NewSQLWithValues(sql, problem.Id, "messages", md5String(msg), msg).MustExecute()
	p.NewSQLWithValues(sql, problem.Id, "hosts", md5String(host), host).MustExecute()

	return c.JSON(201, struct {
		Id int `json:"id"`
	}{id})
}

func md5String(i string) string {
	return fmt.Sprintf("%x", md5.Sum([]byte(i)))
}
