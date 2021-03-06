package shared

import (
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
)

type (
	Validator struct {
		ctxModels CtxModels
		validator *validator.Validate
	}
)

func (v *Validator) Validate(i interface{}) error {
	return v.validator.Struct(i)
}

func NewValidator(ctxModels CtxModels) (v *Validator) {
	validate := validator.New()
	v = &Validator{ctxModels, validate}
	validate.RegisterValidation("uniqueness", v.validateUniqueness)
	return
}

func (v Validator) validateUniqueness(fl validator.FieldLevel) bool {
	structName := fl.Top().Type().Name()
	m := v.ctxModels.ModelByName(structName)
	if m == nil {
		return false
	}
	f := m.FieldByName(fl.StructFieldName())
	if f == nil {
		return false
	}
	var id int
	if field := fl.Top().FieldByName("Id"); field.IsValid() {
		id, _ = field.Interface().(int)
	}
	var sql string
	var value interface{}
	switch fl.Param() {
	case "lower":
		sql = "WHERE lower(" + f.ColumnName + ") = $1"
		value = strings.ToLower(fmt.Sprint(fl.Field().Interface()))
	default:
		sql = "WHERE " + f.ColumnName + " = $1"
		value = fl.Field().Interface()
	}
	if id > 0 {
		sql += " AND id != $2"
		return !m.MustExists(sql, value, id)
	}
	return !m.MustExists(sql, value)
}

type (
	ValidationErrors struct {
		Errors []ValidationError
	}

	ValidationError struct {
		FullName string
		Name     string
		Kind     string
		Type     string
		Param    string
	}
)

func PrettifyValidatorValidationErrors(err validator.ValidationErrors) ValidationErrors {
	var errs []ValidationError
	for _, e := range err {
		errs = append(errs, ValidationError{
			FullName: e.Namespace(),
			Name:     e.Field(),
			Kind:     e.Kind().String(),
			Type:     e.Tag(),
			Param:    e.Param(),
		})
	}
	return ValidationErrors{errs}
}
