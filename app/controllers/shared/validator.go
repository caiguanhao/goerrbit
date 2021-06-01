package shared

import (
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
	return
}

type (
	ValidationError struct {
		Errors []validationError
	}

	validationError struct {
		FullName string
		Name     string
		Kind     string
		Type     string
		Param    string
	}
)

func PrettifyValidatorValidationErrors(err validator.ValidationErrors) ValidationError {
	var errs []validationError
	for _, e := range err {
		errs = append(errs, validationError{
			FullName: e.Namespace(),
			Name:     e.Field(),
			Kind:     e.Kind().String(),
			Type:     e.Tag(),
			Param:    e.Param(),
		})
	}
	return ValidationError{errs}
}
