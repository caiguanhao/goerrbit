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
	controllers []interface {
		init(*echo.Group)
	}
)

func Mount(g *echo.Group) {
	for _, c := range controllers {
		c.init(g)
	}
	g.GET("/*", echo.NotFoundHandler)
}
