package serializers

import (
	"goerrbit/app/models"
	"time"
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
