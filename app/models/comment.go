package models

import "time"

type (
	Comment struct {
		Id        int
		ProblemId int    `validate:"required"`
		UserId    int    `validate:"required"`
		Body      string `validate:"gt=0,lte=10000"`
		CreatedAt time.Time
		UpdatedAt time.Time
	}
)
