package apiv3

import (
	"crypto/md5"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/caiguanhao/goerrbit/app/serializers"
	"github.com/caiguanhao/goerrbit/plugins"
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
	// create error report from request json
	var report models.ErrorReport
	if err := c.Bind(&report); err != nil {
		return err
	}

	apiKey := report.Key
	if token := c.Request().Header.Get("X-Airbrake-Token"); token != "" {
		apiKey = token
	}
	if auth := strings.TrimPrefix(c.Request().Header.Get("Authorization"), "Bearer "); auth != "" {
		apiKey = auth
	}

	// find app
	a := c.(Ctx).ModelApp
	var app models.App
	err := a.Find("WHERE api_key = $1", apiKey).Query(&app)
	if err == a.Connection().ErrNoRows() {
		return c.String(422, "Your API key is unknown")
	} else if err != nil {
		return err
	}

	// find or create problem
	newNotice := report.MakeNotice()
	fingerprint := app.GenerateFingerprint(newNotice)
	p := c.(Ctx).ModelProblem
	if !p.MustExists("WHERE app_id = $1 AND fingerprint = $2", app.Id, fingerprint) {
		p.Insert(
			"AppId", app.Id,
			"Fingerprint", fingerprint,
		)().MustExecute()
	}
	var problem models.Problem
	p.Find("WHERE app_id = $1 AND fingerprint = $2", app.Id, fingerprint).MustQuery(&problem)
	newNotice.ProblemId = problem.Id

	problemWasResolved := problem.ResolvedAt != nil
	shouldNotify := problemWasResolved || time.Now().Sub(problem.LastNoticeAt).Seconds() >= 30

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
		"ErrorClass", notice.ErrorClass,
		"Environment", notice.EnvironmentName(),
		"LastNoticeAt", notice.CreatedAt,
		"LastNoticeId", notice.Id,
		"Message", notice.Message,
		"ResolvedAt", nil,
		"Location", notice.Location(),
	)("WHERE id = $1", problem.Id).MustExecute()
	p.NewSQLWithValues("UPDATE problems SET notices_count = notices_count + 1 WHERE id = $1", problem.Id).MustExecute()
	sql := models.NewValueWithCountUpdateSQL("problems", "meta")
	ua, msg, host := notice.UserAgentString(), notice.Message, notice.Host()
	p.NewSQLWithValues(sql, problem.Id, "user_agents", md5String(ua), ua).MustExecute()
	p.NewSQLWithValues(sql, problem.Id, "messages", md5String(msg), msg).MustExecute()
	p.NewSQLWithValues(sql, problem.Id, "hosts", md5String(host), host).MustExecute()

	if shouldNotify {
		p.Find("WHERE id = $1", problem.Id).MustQuery(&problem)
		notification := serializers.NewNotification(app, problem, c.(Ctx).Configs.Prefix)
		plugins := c.Get("Services").(plugins.Plugins)
		var nss []models.NotificationService
		c.(Ctx).ModelNotificationService.Find("WHERE app_id = $1 AND enabled = true", app.Id).MustQuery(&nss)
		for _, ns := range nss {
			plugin := plugins.FindByName(ns.Name)
			plugin.CreateNotification(ns.Options, notification)
		}
	}

	return c.JSON(201, struct {
		Id string `json:"id"`
	}{strconv.Itoa(id)})
}

func md5String(i string) string {
	return fmt.Sprintf("%x", md5.Sum([]byte(i)))
}
