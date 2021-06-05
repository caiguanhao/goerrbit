package admin

import (
	"strings"

	"github.com/caiguanhao/goerrbit/app/controllers/shared"
	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/labstack/echo/v4"
)

type signInCtrl baseCtrl
type signOutCtrl baseCtrl

func init() {
	controllersWithoutAuth = append(controllersWithoutAuth, signInCtrl{})
	controllers = append(controllers, signOutCtrl{})
}

func (ctrl signInCtrl) init(g *echo.Group) {
	g.POST("/sign-in", ctrl.signIn)
}

func (ctrl signOutCtrl) init(g *echo.Group) {
	g.POST("/sign-out", ctrl.signOut)
}

func (_ signInCtrl) signIn(c echo.Context) error {
	var req struct {
		Name     string `validate:"gt=0,lte=30"`
		Password string `validate:"gte=6,lte=72"`
	}
	c.Bind(&req)
	c.(Ctx).MustValidate(req)
	var user models.User
	err := c.(Ctx).ModelUser.Find("WHERE lower(name) = $1", strings.ToLower(req.Name)).Query(&user)
	if err != nil || !user.Password.Equal(req.Password) {
		return c.JSON(401, shared.ValidationErrors{
			Errors: []shared.ValidationError{{
				FullName: "Password",
				Name:     "Password",
				Kind:     "string",
				Type:     "wrong",
				Param:    "",
			}},
		})
	}
	if user.DeletedAt != nil {
		return c.JSON(401, shared.ValidationErrors{
			Errors: []shared.ValidationError{{
				FullName: "Name",
				Name:     "Name",
				Kind:     "string",
				Type:     "deleted",
				Param:    "",
			}},
		})
	}
	return c.JSON(200, struct {
		Token string
	}{c.(Ctx).NewSession(user.Id)})
}

func (_ signOutCtrl) signOut(c echo.Context) error {
	userId, sessionId, _ := c.(Ctx).GetUserAndSessionId()
	c.(Ctx).ModelUserSession.Delete("WHERE user_id = $1 AND session_id = $2", userId, sessionId).MustExecute()
	return c.NoContent(204)
}
