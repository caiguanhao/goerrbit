package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"runtime/debug"

	"github.com/caiguanhao/goerrbit/app/configs"
	"github.com/caiguanhao/goerrbit/app/controllers/admin"
	"github.com/caiguanhao/goerrbit/app/controllers/apiv3"
	"github.com/caiguanhao/goerrbit/app/controllers/apiv5"
	"github.com/caiguanhao/goerrbit/app/controllers/shared"
	"github.com/go-playground/validator/v10"
	"github.com/gopsql/db"
	"github.com/gopsql/logger"
	"github.com/labstack/echo/v4"
)

type (
	Ctrl struct {
		DBConn db.DB
		Logger logger.Logger
		Config *configs.Configs
		Static http.FileSystem

		Version string

		echo      *echo.Echo
		errNoRows error
	}
)

func (ctrl *Ctrl) NewEchoServer() *echo.Echo {
	ctxModels := shared.NewCtxModels(ctrl.DBConn, ctrl.Logger)
	ctrl.errNoRows = ctrl.DBConn.ErrNoRows()

	e := echo.New()
	e.HidePort = true
	e.HideBanner = true
	e.Validator = shared.NewValidator(ctxModels)
	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (err error) {
			c = shared.Ctx{
				Context:   c,
				CtxModels: ctxModels,
				Configs:   ctrl.Config,
			}
			ctrl.setReqBody(c)
			defer ctrl.handlePanic(c)
			return next(c)
		}
	})
	e.HTTPErrorHandler = ctrl.handleError

	admin.Mount(e.Group("/api/admin"))
	apiv3.Mount(e.Group("/api/v3"))

	// noop
	apiv5.Mount(e.Group("/api/v5"))
	e.GET("/api/notifier-configs/*", func(c echo.Context) error {
		return c.JSON(200, struct{}{})
	})

	if ctrl.Static != nil {
		public := echo.WrapHandler(http.FileServer(ctrl.Static))
		e.GET("/*", func(c echo.Context) error {
			req := c.Request()
			resp := httptest.NewRecorder()
			e := public(e.NewContext(req, resp))
			if e != nil || resp.Code == 404 {
				req.URL.Path = "/"
			}
			return public(c)
		})
	}

	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (err error) {
			c.Response().Header().Set("X-GOERRBIT-VERSION", ctrl.Version)
			return next(c)
		}
	})

	ctrl.echo = e

	return e
}

func (ctrl *Ctrl) setReqBody(c echo.Context) {
	if req := c.Request(); req.ContentLength <= 100*1024 {
		b, _ := ioutil.ReadAll(req.Body)
		req.Body.Close()
		req.Body = ioutil.NopCloser(bytes.NewBuffer(b))
		c.Set("ReqBody", b)
	} else {
		c.Set("ReqBody", nil)
	}
}

func (ctrl *Ctrl) handlePanic(c echo.Context) {
	r := recover()
	if r == nil {
		return
	}
	err, ok := r.(error)
	if !ok {
		err = fmt.Errorf("%v", r)
	}
	ctrl.handleError(err, c)
}

func (ctrl *Ctrl) handleError(err error, c echo.Context) {
	if err == ctrl.errNoRows {
		c.NoContent(404)
		return
	}

	if errs, ok := err.(validator.ValidationErrors); ok {
		c.JSON(400, shared.PrettifyValidatorValidationErrors(errs))
		return
	}

	he, ok := err.(*echo.HTTPError)
	if !ok || he.Code >= 500 {
		log := ctrl.Logger
		log.Error("error:", err)
		defer func() {
			if r := recover(); r != nil {
				log.Error("panic:", r)
				log.Error(string(debug.Stack()))
			}
		}()
		params := make(map[string]interface{})
		if b, ok := c.Get("ReqBody").([]byte); ok {
			if json.Unmarshal(b, &params) != nil {
				params["ReqBody"] = string(b)
			}
		}
		apiv3.NotifySelf(c, err, params)
	}

	ctrl.echo.DefaultHTTPErrorHandler(err, c)
}
