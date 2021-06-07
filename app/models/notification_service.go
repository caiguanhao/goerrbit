package models

import (
	"time"
)

type (
	NotificationService struct {
		Id        int
		AppId     int
		Enabled   bool
		Name      string      `validate:"required"`
		Options   interface{} `jsonb:"meta"`
		CreatedAt time.Time
		UpdatedAt time.Time
	}
)
