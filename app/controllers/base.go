package controllers

import (
	"fmt"
	"net/http"
	"net/http/httptest"

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

func New(conn db.DB, log logger.Logger, config *configs.Configs, static http.FileSystem) *echo.Echo {
	ctxModels := shared.NewCtxModels(conn, log)

	e := echo.New()
	e.HidePort = true
	e.HideBanner = true
	e.Validator = shared.NewValidator(ctxModels)
	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (err error) {
			defer func() {
				if r := recover(); r != nil {
					err, ok := r.(error)
					if !ok {
						err = fmt.Errorf("%v", r)
					}
					c.Error(err)
				}
			}()
			return next(c)
		}
	})
	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (err error) {
			return next(shared.Ctx{
				Context:   c,
				CtxModels: ctxModels,
				Configs:   config,
			})
		}
	})
	errNoRows := conn.ErrNoRows()
	e.HTTPErrorHandler = func(err error, c echo.Context) {
		if err == errNoRows {
			c.NoContent(404)
			return
		}

		if errs, ok := err.(validator.ValidationErrors); ok {
			c.JSON(400, shared.PrettifyValidatorValidationErrors(errs))
			return
		}

		log.Error("error:", err)
		e.DefaultHTTPErrorHandler(err, c)
	}

	admin.Mount(e.Group("/api/admin"))
	apiv3.Mount(e.Group("/api/v3"))
	apiv5.Mount(e.Group("/api/v5"))

	if static != nil {
		public := echo.WrapHandler(http.FileServer(static))
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

	return e
}
