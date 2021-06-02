package serializers

import (
	"goerrbit/app/models"
	"time"
)

type (
	AdminApp struct {
		Id            int
		Name          string
		ApiKey        string
		Fingerprinter *models.Fingerprinter
		ProblemsCount int
		CreatedAt     time.Time
		UpdatedAt     time.Time
	}
)

func NewAdminApp(app models.App) AdminApp {
	return AdminApp{
		Id:            app.Id,
		Name:          app.Name,
		ApiKey:        app.ApiKey,
		Fingerprinter: app.Fingerprinter,
		CreatedAt:     app.CreatedAt,
		UpdatedAt:     app.UpdatedAt,
	}
}
