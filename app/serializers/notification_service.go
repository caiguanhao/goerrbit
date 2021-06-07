package serializers

import (
	"time"

	"github.com/caiguanhao/goerrbit/app/models"
)

type (
	AdminNotificationService struct {
		Id        int
		AppId     int
		Enabled   bool
		Name      string
		Options   interface{}
		CreatedAt time.Time
		UpdatedAt time.Time
	}
)

func NewAdminNotificationService(ns models.NotificationService) AdminNotificationService {
	return AdminNotificationService{
		Id:        ns.Id,
		AppId:     ns.AppId,
		Enabled:   ns.Enabled,
		Name:      ns.Name,
		Options:   ns.Options,
		CreatedAt: ns.CreatedAt,
		UpdatedAt: ns.UpdatedAt,
	}
}
