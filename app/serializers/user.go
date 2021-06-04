package serializers

import (
	"github.com/caiguanhao/goerrbit/app/models"
)

type (
	AdminUserSimple struct {
		Id   int
		Name string
	}
)

func NewAdminUserSimple(user models.User) AdminUserSimple {
	return AdminUserSimple{
		Id:   user.Id,
		Name: user.Name,
	}
}
