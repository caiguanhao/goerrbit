package serializers

import (
	"time"

	"github.com/caiguanhao/goerrbit/app/models"
)

type (
	AdminUserSimple struct {
		Id      int
		Name    string
		IsAdmin bool
	}

	AdminUser struct {
		AdminUserSimple
		SessionsCount int
		CreatedAt     time.Time
		UpdatedAt     time.Time
		DeletedAt     *time.Time
	}
)

func NewAdminUserSimple(user models.User) AdminUserSimple {
	return AdminUserSimple{
		Id:      user.Id,
		Name:    user.Name,
		IsAdmin: user.IsAdmin,
	}
}

func NewAdminUser(user models.User) AdminUser {
	return AdminUser{
		AdminUserSimple: NewAdminUserSimple(user),
		CreatedAt:       user.CreatedAt,
		UpdatedAt:       user.UpdatedAt,
		DeletedAt:       user.DeletedAt,
	}
}
