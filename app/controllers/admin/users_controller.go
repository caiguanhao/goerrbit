package admin

import (
	"github.com/caiguanhao/goerrbit/app/serializers"
	"github.com/labstack/echo/v4"
)

type usersCtrl baseCtrl

func init() {
	controllers = append(controllers, usersCtrl{})
}

func (ctrl usersCtrl) init(g *echo.Group) {
	g.GET("/users/me", ctrl.me)
}

func (_ usersCtrl) me(c echo.Context) error {
	res := struct {
		User *serializers.AdminUserSimple
	}{}
	u := c.(Ctx).CurrentUser()
	if u != nil {
		au := serializers.NewAdminUserSimple(*u)
		res.User = &au
	}
	return c.JSON(200, res)
}
