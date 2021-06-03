package apiv5

import (
	"github.com/labstack/echo/v4"
)

type perfCtrl baseCtrl

func init() {
	controllers = append(controllers, perfCtrl{})
}

func (c perfCtrl) init(g *echo.Group) {
	g.PUT("/projects/:id/routes-stats", c.noop)
	g.PUT("/projects/:id/routes-breakdowns", c.noop)
}

func (_ perfCtrl) noop(c echo.Context) error {
	return c.NoContent(204)
}
