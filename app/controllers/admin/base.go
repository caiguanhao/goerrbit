package admin

import (
	"github.com/caiguanhao/goerrbit/app/controllers/shared"
	"github.com/labstack/echo/v4"
)

type (
	Ctx = shared.Ctx

	baseCtrl struct{}
)

var (
	controllersWithoutAuth []interface {
		init(*echo.Group)
	}
	controllers []interface {
		init(*echo.Group)
	}
)

func Mount(g *echo.Group) {
	for _, c := range controllersWithoutAuth {
		c.init(g)
	}
	g.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (err error) {
			if u := c.(Ctx).CurrentUser(); u == nil {
				return c.JSON(401, struct {
					Message string
				}{"Please log in"})
			}
			return next(c)
		}
	})
	for _, c := range controllers {
		c.init(g)
	}
	g.GET("/*", echo.NotFoundHandler)
}
