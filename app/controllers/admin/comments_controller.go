package admin

import (
	"github.com/caiguanhao/goerrbit/app/controllers/shared"
	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/caiguanhao/goerrbit/app/serializers"
	"github.com/gopsql/pagination/v2"
	"github.com/labstack/echo/v4"
)

type commentsCtrl baseCtrl

func init() {
	controllers = append(controllers, commentsCtrl{})
}

func (c commentsCtrl) init(g *echo.Group) {
	g.GET("/apps/:app_id/problems/:problem_id/comments", c.list)
	g.POST("/apps/:app_id/problems/:problem_id/comments", c.create)
	g.PUT("/apps/:app_id/problems/:problem_id/comments/:id", c.update)
	g.DELETE("/apps/:app_id/problems/:problem_id/comments/:id", c.destroy, UserMustBeAdmin)
}

func (ctrl commentsCtrl) list(c echo.Context) error {
	_, problemId := ctrl.findProblem(c)
	q := pagination.Pagination{
		MaxPer:     100,
		DefaultPer: 50,
	}
	c.Bind(&q)
	sql := "WHERE problem_id = $1"
	count := c.(Ctx).ModelComment.MustCount(sql, problemId)
	comments := []models.Comment{}
	sql = sql + " ORDER BY created_at ASC " + q.LimitOffset()
	c.(Ctx).ModelComment.Find(sql, problemId).MustQuery(&comments)
	ac := []serializers.AdminComment{}
	userIds := []int{}
	for _, comment := range comments {
		ac = append(ac, serializers.NewAdminComment(comment))
		userIds = appendIfMissing(userIds, comment.UserId)
	}
	u := []serializers.AdminUserSimple{}
	if len(userIds) > 0 {
		var users []models.User
		c.(Ctx).ModelUser.Find("WHERE id = ANY($1)", userIds).MustQuery(&users)
		for _, user := range users {
			u = append(u, serializers.NewAdminUserSimple(user))
		}
	}
	return c.JSON(200, struct {
		Comments   []serializers.AdminComment
		Users      []serializers.AdminUserSimple
		Pagination pagination.PaginationResult
	}{ac, u, q.PaginationResult(count)})
}

func (ctrl commentsCtrl) create(c echo.Context) error {
	_, problemId := ctrl.findProblem(c)
	var comment models.Comment
	comment.ProblemId = problemId
	comment.UserId = c.(Ctx).CurrentUser().Id
	if c.Request().ContentLength == 0 {
		return c.JSON(200, struct {
			Comment serializers.AdminComment
		}{serializers.NewAdminComment(comment)})
	}
	m := c.(Ctx).ModelComment
	changes := m.MustAssign(
		&comment,
		"ProblemId", comment.ProblemId,
		"UserId", comment.UserId,
		m.Permit(ctrl.params()...).Filter(c.Request().Body),
		m.CreatedAt(),
		m.UpdatedAt(),
	)
	c.(Ctx).MustValidate(comment)

	var lastCommentBody string
	m.Select("body", "WHERE problem_id = $1 ORDER BY created_at DESC", problemId).QueryRow(&lastCommentBody)
	if lastCommentBody == comment.Body {
		return c.JSON(400, shared.ValidationErrors{
			Errors: []shared.ValidationError{{
				FullName: "Comment.Body",
				Name:     "Body",
				Kind:     "string",
				Type:     "duplicate",
				Param:    "",
			}},
		})
	}

	var id int
	m.Insert(changes...)("RETURNING id").MustQueryRow(&id)
	m.Find("WHERE id = $1", id).MustQuery(&comment)
	return c.NoContent(204)
}

func (ctrl commentsCtrl) update(c echo.Context) error {
	_, problemId := ctrl.findProblem(c)
	var comment models.Comment
	m := c.(Ctx).ModelComment
	m.Find("WHERE problem_id = $1 AND id = $2 AND user_id = $3",
		problemId, c.Param("id"), c.(Ctx).CurrentUser().Id).MustQuery(&comment)
	changes := m.MustAssign(
		&comment,
		m.Permit(ctrl.params()...).Filter(c.Request().Body),
		m.UpdatedAt(),
	)
	c.(Ctx).MustValidate(comment)
	m.Update(changes...)("WHERE id = $1", comment.Id).MustExecute()
	return c.NoContent(204)
}

func (ctrl commentsCtrl) destroy(c echo.Context) error {
	_, problemId := ctrl.findProblem(c)
	c.(Ctx).ModelComment.Delete("WHERE problem_id = $1 AND id = $2", problemId, c.Param("id")).MustExecute()
	return c.NoContent(204)
}

func (commentsCtrl) params() []string {
	return []string{"Body"}
}

func (commentsCtrl) findProblem(c echo.Context) (appId, problemId int) {
	c.(Ctx).ModelApp.Select("id", "WHERE id = $1", c.Param("app_id")).MustQueryRow(&appId)
	c.(Ctx).ModelProblem.Select("id", "WHERE app_id = $1 AND id = $2", appId, c.Param("problem_id")).MustQueryRow(&problemId)
	return
}
