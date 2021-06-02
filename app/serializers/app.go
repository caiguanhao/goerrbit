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
		ProblemsCount int
		CreatedAt     time.Time
		UpdatedAt     time.Time
	}

	AdminAppDetails struct {
		AdminApp
		Fingerprinter       *models.Fingerprinter
		ActualFingerprinter *models.Fingerprinter
	}
)

func NewAdminApp(app models.App) AdminApp {
	return AdminApp{
		Id:        app.Id,
		Name:      app.Name,
		ApiKey:    app.ApiKey,
		CreatedAt: app.CreatedAt,
		UpdatedAt: app.UpdatedAt,
	}
}

func NewAdminAppDetails(app models.App) AdminAppDetails {
	return AdminAppDetails{
		AdminApp:            NewAdminApp(app),
		Fingerprinter:       app.Fingerprinter,
		ActualFingerprinter: app.GetFingerprinter(),
	}
}
