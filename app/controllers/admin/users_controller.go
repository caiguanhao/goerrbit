package admin

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/caiguanhao/goerrbit/app/serializers"
	"github.com/gopsql/pagination/v2"
	"github.com/labstack/echo/v4"
)

type usersCtrl baseCtrl

func init() {
	controllers = append(controllers, usersCtrl{})
}

func (ctrl usersCtrl) init(g *echo.Group) {
	g.GET("/users", ctrl.list)
	g.GET("/users/me", ctrl.me)
	g.PUT("/users/me", ctrl.updateMe)
	g.GET("/users/:id", ctrl.show)
	g.PUT("/users/:id", ctrl.update, UserMustBeAdmin)
	g.POST("/users", ctrl.create, UserMustBeAdmin)
	g.POST("/users/:id", ctrl.restore, UserMustBeAdmin)
	g.DELETE("/users/:id", ctrl.destroy, UserMustBeAdmin)
}

func (_ usersCtrl) list(c echo.Context) error {
	q := pagination.PaginationQuerySort{
		pagination.Pagination{
			MaxPer:     50,
			DefaultPer: 20,
		},
		pagination.Query{},
		pagination.Sort{
			AllowedSorts: []string{
				"name",
				"created_at",
			},
			DefaultSort:  "created_at",
			DefaultOrder: "desc",
		},
	}
	c.Bind(&q)

	var cond []string
	var args []interface{}
	if pattern := q.GetLikePattern(); pattern != "" {
		cond = append(cond, "name ILIKE $?")
		args = append(args, pattern)
	}
	if c.QueryParam("status") == "deleted" {
		cond = append(cond, "deleted_at IS NOT NULL")
	} else {
		cond = append(cond, "deleted_at IS NULL")
	}

	var sql string
	if len(cond) > 0 {
		for i := range cond {
			cond[i] = strings.Replace(cond[i], "$?", fmt.Sprintf("$%d", i+1), -1)
		}
		sql = "WHERE " + strings.Join(cond, " AND ")
	}

	count := c.(Ctx).ModelUser.MustCount(append([]interface{}{sql}, args...)...)
	users := []models.User{}
	sql = sql + " " + q.OrderByLimitOffset()
	c.(Ctx).ModelUser.Find(append([]interface{}{sql}, args...)...).MustQuery(&users)
	res := struct {
		Users      []serializers.AdminUser
		Pagination pagination.PaginationQuerySortResult
	}{}
	res.Users = []serializers.AdminUser{}
	res.Pagination = q.PaginationQuerySortResult(count)
	for _, user := range users {
		a := serializers.NewAdminUser(user)
		res.Users = append(res.Users, a)
	}
	return c.JSON(200, res)
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

func (ctrl usersCtrl) show(c echo.Context) error {
	var user models.User
	c.(Ctx).ModelUser.Find("WHERE id = $1", c.Param("id")).MustQuery(&user)
	return ctrl.detailsUser(c, user)
}

func (ctrl usersCtrl) create(c echo.Context) error {
	var user models.User
	if c.Request().ContentLength == 0 {
		return ctrl.detailsUser(c, user)
	}
	var id int
	m := c.(Ctx).ModelUser
	changes := m.MustAssign(
		&user,
		m.Permit(ctrl.params()...).Filter(c.Request().Body),
	)
	c.(Ctx).MustValidate(user)
	m.Insert(changes...)("RETURNING id").MustQueryRow(&id)
	m.Find("WHERE id = $1", id).MustQuery(&user)
	return ctrl.detailsUser(c, user)
}

func (ctrl usersCtrl) update(c echo.Context) error {
	var user models.User
	user.Id, _ = strconv.Atoi(c.Param("id"))
	m := c.(Ctx).ModelUser
	changes := m.MustAssign(
		&user,
		m.Permit(ctrl.params()...).Filter(c.Request().Body),
		m.UpdatedAt(),
	)
	c.(Ctx).MustValidate(user)
	m.Update(changes...)("WHERE id = $1", user.Id).MustExecute()
	m.Find("WHERE id = $1", user.Id).MustQuery(&user)
	return ctrl.detailsUser(c, user)
}

func (ctrl usersCtrl) updateMe(c echo.Context) error {
	var user models.User
	user.Id = c.(Ctx).CurrentUser().Id
	m := c.(Ctx).ModelUser
	changes := m.MustAssign(
		&user,
		m.Permit(ctrl.updateMeParams()...).Filter(c.Request().Body),
		m.UpdatedAt(),
	)
	c.(Ctx).MustValidate(user)
	m.Update(changes...)("WHERE id = $1", user.Id).MustExecute()
	m.Find("WHERE id = $1", user.Id).MustQuery(&user)
	return ctrl.detailsUser(c, user)
}

func (ctrl usersCtrl) restore(c echo.Context) error {
	m := c.(Ctx).ModelUser
	m.Update(
		m.Changes(map[string]interface{}{
			"DeletedAt": nil,
		}),
	)("WHERE id = $1", c.Param("id")).MustExecute()
	return ctrl.show(c)
}

func (ctrl usersCtrl) destroy(c echo.Context) error {
	m := c.(Ctx).ModelUser
	m.Update(
		m.Changes(map[string]interface{}{
			"DeletedAt": time.Now(),
		}),
	)("WHERE id = $1", c.Param("id")).MustExecute()
	c.(Ctx).ModelUserSession.Delete("WHERE user_id = $1", c.Param("id")).MustExecute()
	return ctrl.show(c)
}

func (usersCtrl) params() []string {
	return []string{
		"Name", "Password", "IsAdmin",
	}
}

func (usersCtrl) updateMeParams() []string {
	return []string{
		"Name", "Password",
	}
}

func (ctrl usersCtrl) detailsUser(c echo.Context, user models.User) error {
	u := serializers.NewAdminUser(user)
	if user.Id > 0 {
		u.SessionsCount = c.(Ctx).ModelUserSession.MustCount("WHERE user_id = $1", user.Id)
	}
	return c.JSON(200, struct {
		User serializers.AdminUser
	}{u})
}
