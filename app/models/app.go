package models

import (
	"encoding/json"
	"strings"
	"time"
)

type (
	App struct {
		Id            int
		Name          string         `validate:"gt=0,lte=100"`
		ApiKey        string         `validate:"required,uniqueness"`
		Fingerprinter *Fingerprinter `jsonb:"meta"`
		CreatedAt     time.Time
		UpdatedAt     time.Time
		DeletedAt     *time.Time `dataType:"timestamptz"`
	}

	Fingerprinter struct {
		ErrorClass      bool
		Message         bool
		BacktraceLines  int
		Component       bool
		Action          bool
		EnvironmentName bool
	}
)

var (
	DefaultFingerprinter = &Fingerprinter{
		ErrorClass:      true,
		Message:         true,
		BacktraceLines:  -1,
		Component:       true,
		Action:          true,
		EnvironmentName: true,
	}
)

func (App) AfterCreateSchema() string {
	return `CREATE UNIQUE INDEX unique_app ON apps USING btree (api_key);`
}

func (a App) GetFingerprinter() *Fingerprinter {
	if a.Fingerprinter == nil {
		return DefaultFingerprinter
	}
	return a.Fingerprinter
}

func (a App) GenerateFingerprint(notice Notice) string {
	return md5String(a.GetFingerprinter().Generate(a.ApiKey, notice))
}

func (f Fingerprinter) Generate(apiKey string, notice Notice) string {
	materials := []string{apiKey}
	if f.ErrorClass {
		materials = append(materials, notice.ErrorClass)
	}
	if f.Message {
		materials = append(materials, notice.FilteredMessage())
	}
	if f.Component {
		materials = append(materials, notice.Request.Component)
	}
	if f.Action {
		materials = append(materials, notice.Request.Action)
	}
	if f.EnvironmentName {
		materials = append(materials, notice.EnvironmentName())
	}
	if len(notice.Backtraces) > 0 {
		for i, b := range notice.Backtraces {
			if f.BacktraceLines >= 0 && i >= f.BacktraceLines {
				break
			}
			bj, _ := json.Marshal(b)
			materials = append(materials, string(bj))
		}
	}
	return strings.Join(materials, "")
}
