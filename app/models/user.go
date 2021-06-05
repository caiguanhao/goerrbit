package models

import (
	"time"

	"github.com/gopsql/bcrypt"
)

type (
	User struct {
		Id        int
		Name      string          `validate:"gt=0,lte=30,uniqueness=lower"`
		Password  bcrypt.Password `validate:"required"`
		IsAdmin   bool
		CreatedAt time.Time
		UpdatedAt time.Time
		DeletedAt *time.Time `dataType:"timestamptz"`
	}

	UserSession struct {
		Id        int
		UserId    int
		SessionId string `dataType:"UUID NOT NULL DEFAULT gen_random_uuid()"`
		IpAddress string
		UserAgent string
		CreatedAt time.Time
		UpdatedAt time.Time
	}
)

func (User) AfterCreateSchema() string {
	return `CREATE UNIQUE INDEX unique_user ON users USING btree (lower(name));`
}

func NewUser(name, password string) User {
	u := User{
		Name: name,
	}
	u.Password.MustUpdate(password)
	return u
}
