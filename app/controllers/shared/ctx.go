package shared

import (
	"goerrbit/app/models"
	"reflect"

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

func (c Ctx) MustValidate(i interface{}) {
	if err := c.Validate(i); err != nil {
		panic(err)
	}
}

// m.ModelByName("User") => m.ModelUser
func (models CtxModels) ModelByName(name string) *psql.Model {
	if name == "" {
		return nil
	}
	rv := reflect.ValueOf(models)
	f := rv.FieldByName(name)
	if !f.IsValid() {
		f = rv.FieldByName("Model" + name)
	}
	if !f.IsValid() {
		return nil
	}
	if m, ok := f.Interface().(*psql.Model); ok {
		return m
	}
	return nil
}
