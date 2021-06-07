package serializers

import (
	"fmt"
	"strconv"
	"time"

	"github.com/caiguanhao/goerrbit/app/models"
)

type (
	AdminProblem struct {
		Id    int
		AppId int

		Message     string
		ErrorClass  string
		Environment string
		Location    string

		UserAgents models.PercentageTable
		Messages   models.PercentageTable
		Hosts      models.PercentageTable

		NoticesCount  int
		LastNoticeId  int
		LastNoticeAt  time.Time
		FirstNoticeAt time.Time
		ResolvedAt    *time.Time
	}

	Percentage struct {
		Value      string
		Percentage string
	}

	Notification map[string]string
)

func NewAdminProblem(problem models.Problem) AdminProblem {
	return AdminProblem{
		Id:    problem.Id,
		AppId: problem.AppId,

		Message:     problem.Message,
		ErrorClass:  problem.ErrorClass,
		Environment: problem.Environment,
		Location:    problem.Location,

		UserAgents: problem.UserAgents.ToPercentageTable(),
		Messages:   problem.Messages.ToPercentageTable(),
		Hosts:      problem.Hosts.ToPercentageTable(),

		NoticesCount:  problem.NoticesCount,
		LastNoticeId:  problem.LastNoticeId,
		LastNoticeAt:  problem.LastNoticeAt,
		FirstNoticeAt: problem.FirstNoticeAt,
		ResolvedAt:    problem.ResolvedAt,
	}
}

func NewNotification(app models.App, problem models.Problem, prefix string) Notification {
	return Notification{
		"Id":            strconv.Itoa(problem.Id),
		"AppId":         strconv.Itoa(app.Id),
		"AppName":       app.Name,
		"Message":       problem.Message,
		"ErrorClass":    problem.ErrorClass,
		"Environment":   problem.Environment,
		"Location":      problem.Location,
		"Url":           fmt.Sprintf("%s/apps/%d/problems/%d", prefix, app.Id, problem.Id),
		"NoticesCount":  strconv.Itoa(problem.NoticesCount),
		"LastNoticeId":  strconv.Itoa(problem.LastNoticeId),
		"LastNoticeAt":  problem.LastNoticeAt.Format(time.RFC3339),
		"FirstNoticeAt": problem.FirstNoticeAt.Format(time.RFC3339),
	}
}
