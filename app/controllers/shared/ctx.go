package shared

import (
	"crypto/rsa"
	"errors"
	"fmt"
	"reflect"
	"strings"

	"github.com/caiguanhao/goerrbit/app/configs"
	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/gopsql/psql"
	"github.com/labstack/echo/v4"
)

type (
	Ctx struct {
		echo.Context
		CtxModels
		Configs *configs.Configs
	}

	CtxModels struct {
		ModelApp         *psql.Model
		ModelProblem     *psql.Model
		ModelNotice      *psql.Model
		ModelUser        *psql.Model
		ModelUserSession *psql.Model
	}
)

func NewCtxModels(options ...interface{}) CtxModels {
	return CtxModels{
		ModelApp:         psql.NewModel(models.App{}, options...),
		ModelProblem:     psql.NewModel(models.Problem{}, options...),
		ModelNotice:      psql.NewModel(models.Notice{}, options...),
		ModelUser:        psql.NewModel(models.User{}, options...),
		ModelUserSession: psql.NewModel(models.UserSession{}, options...),
	}
}

func (c Ctx) MustValidate(i interface{}) {
	if err := c.Validate(i); err != nil {
		panic(err)
	}
}

func (c Ctx) NewSession(userId int) string {
	var sessionId string
	m := c.ModelUserSession
	m.Insert(
		m.Changes(map[string]interface{}{
			"UserId":    userId,
			"IpAddress": c.RealIP(),
			"UserAgent": c.Request().UserAgent(),
		}),
	)("RETURNING session_id").MustQueryRow(&sessionId)
	m.Delete("WHERE id IN (SELECT id FROM user_sessions WHERE user_id = $1 "+
		"ORDER BY updated_at DESC OFFSET $2)", userId, 10).MustExecute()
	token := jwt.NewWithClaims(jwt.SigningMethodRS256, jwt.MapClaims{
		"UserId":    userId,
		"SessionId": sessionId,
	})
	auth, err := token.SignedString(c.Configs.SessionPrivateKey.PrivateKey)
	if err != nil {
		panic(err)
	}
	return "Bearer " + auth
}

func (c Ctx) CurrentUser() *models.User {
	if cu := c.Get("CurrentUser"); cu != nil {
		return cu.(*models.User)
	}
	auth := c.Request().Header.Get("authorization")
	parts := strings.SplitN(auth, " ", 2)
	if parts[0] != "Bearer" {
		return nil
	}
	claims, e := parseToken(c.Configs.SessionPrivateKey.PublicKey, parts[1])
	if e != nil {
		return nil
	}
	userId, ok := claims["UserId"]
	if !ok {
		return nil
	}
	sessionId, ok := claims["SessionId"]
	if !ok {
		return nil
	}
	var user models.User
	e = c.ModelUser.Find("WHERE deleted_at IS NULL AND id = $1", userId).Query(&user)
	if e != nil {
		return nil
	}
	var userSession models.UserSession
	e = c.ModelUserSession.Find("WHERE user_id = $1 AND session_id = $2", userId, sessionId).Query(&userSession)
	if e != nil {
		return nil
	}
	changes := map[string]interface{}{}
	if ip := c.RealIP(); userSession.IpAddress != ip {
		changes["IpAddress"] = ip
	}
	if ua := c.Request().UserAgent(); userSession.UserAgent != ua {
		changes["UserAgent"] = ua
	}
	if len(changes) > 0 {
		m := c.ModelUserSession
		if m.Update(m.Changes(changes))("WHERE id = $1", userSession.Id).Execute() != nil {
			return nil
		}
	}
	c.Set("CurrentUser", &user)
	return &user
}

// m.ModelByName("User") => m.ModelUser
func (models CtxModels) ModelByName(name string) *psql.Model {
	if name == "" {
		return nil
	}
	rv := reflect.ValueOf(models)
	f := rv.FieldByName(name)
	if !f.IsValid() {
		f = rv.FieldByName("Model" + name)
	}
	if !f.IsValid() {
		return nil
	}
	if m, ok := f.Interface().(*psql.Model); ok {
		return m
	}
	return nil
}

func parseToken(pubKey *rsa.PublicKey, input string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(input, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return pubKey, nil
	})
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}
	return claims, nil
}
