package serializers

import (
	"goerrbit/app/models"
	"time"
)

type (
	AdminNotice struct {
		Id             int
		ProblemId      int
		Message        string
		ErrorClass     string
		Url            string
		Location       string
		AppServer      string
		AppVersion     string
		Framework      string
		ProjectRoot    string
		Backtraces     []models.Backtrace
		EnvVars        map[string]interface{}
		Params         map[string]interface{}
		Session        map[string]interface{}
		UserAttributes map[string]interface{}
		CreatedAt      time.Time
	}
)

func NewAdminNotice(notice models.Notice) AdminNotice {
	return AdminNotice{
		Id:             notice.Id,
		ProblemId:      notice.ProblemId,
		Message:        notice.Message,
		ErrorClass:     notice.ErrorClass,
		Url:            notice.Request.Url,
		Location:       notice.Location(),
		AppServer:      notice.ServerEnvironment.Hostname,
		AppVersion:     notice.ServerEnvironment.AppVersion,
		Framework:      notice.Framework,
		ProjectRoot:    notice.ServerEnvironment.ProjectRoot,
		Backtraces:     notice.Backtraces,
		EnvVars:        notice.Request.CGIData,
		Params:         notice.Request.Params,
		Session:        notice.Request.Session,
		UserAttributes: notice.UserAttributes,
		CreatedAt:      notice.CreatedAt,
	}
}
