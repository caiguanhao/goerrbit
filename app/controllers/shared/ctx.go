package shared

import (
	"goerrbit/app/models"

	"github.com/gopsql/psql"
	"github.com/labstack/echo/v4"
)

type (
	Ctx struct {
		echo.Context
		CtxModels
	}

	CtxModels struct {
		ModelApp     *psql.Model
		ModelProblem *psql.Model
		ModelNotice  *psql.Model
	}
)

func NewCtxModels(options ...interface{}) CtxModels {
	return CtxModels{
		ModelApp:     psql.NewModel(models.App{}, options...),
		ModelProblem: psql.NewModel(models.Problem{}, options...),
		ModelNotice:  psql.NewModel(models.Notice{}, options...),
	}
}
