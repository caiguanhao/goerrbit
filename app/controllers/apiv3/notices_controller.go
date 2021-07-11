package apiv3

import (
	"bytes"
	"crypto/md5"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"net/http/httptest"
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
		var nss []models.NotificationService
		c.(Ctx).ModelNotificationService.Find("WHERE app_id = $1 AND enabled = true", app.Id).MustQuery(&nss)
		for _, ns := range nss {
			go createNotification(c, ns, notification)
		}
	}

	return c.JSON(201, struct {
		Id string `json:"id"`
	}{strconv.Itoa(id)})
}

func createNotification(c echo.Context, ns models.NotificationService, notification serializers.Notification) {
	services := c.Get("Services")
	if services == nil {
		return
	}
	plugins := services.(plugins.Plugins)
	defer func() {
		if r := recover(); r != nil {
			NotifySelf(c, r, map[string]interface{}{
				"Plugins":             plugins.Names(),
				"NotificationService": ns,
				"Notification":        notification,
			})
		}
	}()
	plugin := plugins.FindByName(ns.Name)
	if plugin == nil {
		panic(errors.New("no such plugin: " + ns.Name))
	}
	err := plugin.CreateNotification(ns.Options, notification)
	if err != nil {
		panic(err)
	}
}

func NotifySelf(c echo.Context, err interface{}, params map[string]interface{}) error {
	// find or create app
	const selfErrbitName = "Self.Errbit"
	var selfErrbitApiKey string
	a := c.(Ctx).ModelApp
	a.Select("api_key", "WHERE name = $1", selfErrbitName).QueryRow(&selfErrbitApiKey)
	if selfErrbitApiKey == "" {
		b := make([]byte, 16)
		rand.Read(b)
		selfErrbitApiKey = hex.EncodeToString(b)
		a.Insert(
			"Name", selfErrbitName,
			"ApiKey", selfErrbitApiKey,
		)().MustExecute()
	}
	// make and send error report
	report := models.NewErrorReport(err, c.Request(), 2)
	report.Session = map[string]interface{}{
		"CurrentUser": c.(Ctx).CurrentUser(),
	}
	if params != nil {
		report.Params = params
	}
	var buf bytes.Buffer
	json.NewEncoder(&buf).Encode(report)
	req := httptest.NewRequest("POST", "/", &buf)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set("Authorization", "Bearer "+selfErrbitApiKey)
	rec := httptest.NewRecorder()
	c = c.(Ctx).SetContext(c.Echo().NewContext(req, rec))
	return noticesCtrl{}.create(c)
}

func md5String(i string) string {
	return fmt.Sprintf("%x", md5.Sum([]byte(i)))
}
