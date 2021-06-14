package models

import (
	"encoding/json"
	"fmt"
	"strings"
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

func (ns *NotificationService) ProtectOptions(protectedFields ...string) {
	if len(protectedFields) == 0 {
		return
	}
	b, _ := json.Marshal(ns.Options)
	var options map[string]interface{}
	json.Unmarshal(b, &options)
	for _, field := range protectedFields {
		options[field] = mask(fmt.Sprint(options[field]))
	}
	ns.Options = options
}

func mask(str string) string {
	l := len(str)
	if l == 0 {
		return ""
	}
	if l > 3 {
		return str[0:1] + strings.Repeat("*", len(str)-2) + str[len(str)-1:]
	}
	if l > 1 {
		return str[0:1] + strings.Repeat("*", len(str)-1)
	}
	return "*"
}
