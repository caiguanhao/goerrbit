package serializers

import (
	"time"

	"github.com/caiguanhao/goerrbit/app/models"
)

type (
	AdminAppSimple struct {
		Id   int
		Name string
	}

	AdminApp struct {
		AdminAppSimple
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

func NewAdminAppSimple(app models.App) AdminAppSimple {
	return AdminAppSimple{
		Id:   app.Id,
		Name: app.Name,
	}
}

func NewAdminApp(app models.App) AdminApp {
	return AdminApp{
		AdminAppSimple: NewAdminAppSimple(app),
		ApiKey:         app.ApiKey,
		CreatedAt:      app.CreatedAt,
		UpdatedAt:      app.UpdatedAt,
	}
}

func NewAdminAppDetails(app models.App) AdminAppDetails {
	return AdminAppDetails{
		AdminApp:            NewAdminApp(app),
		Fingerprinter:       app.Fingerprinter,
		ActualFingerprinter: app.GetFingerprinter(),
	}
}
