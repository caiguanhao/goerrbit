package controllers

import (
	"fmt"
	"goerrbit/app/controllers/admin"
	"goerrbit/app/controllers/apiv3"
	"goerrbit/app/controllers/shared"

	"github.com/go-playground/validator/v10"
	"github.com/gopsql/db"
	"github.com/gopsql/logger"
	"github.com/labstack/echo/v4"
)

func New(conn db.DB, log logger.Logger) *echo.Echo {
	ctxModels := shared.NewCtxModels(conn, log)

	e := echo.New()
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

		e.DefaultHTTPErrorHandler(err, c)
	}
	admin.Mount(e.Group("/api/admin"))
	apiv3.Mount(e.Group("/api/v3"))
	return e
}
