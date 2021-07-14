package serializers

import (
	"time"

	"github.com/caiguanhao/goerrbit/app/models"
)

type (
	AdminComment struct {
		Id        int
		UserId    int
		Body      string
		CreatedAt time.Time
		UpdatedAt time.Time
	}
)

func NewAdminComment(comment models.Comment) AdminComment {
	return AdminComment{
		Id:        comment.Id,
		UserId:    comment.UserId,
		Body:      comment.Body,
		CreatedAt: comment.CreatedAt,
		UpdatedAt: comment.UpdatedAt,
	}
}
