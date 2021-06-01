package models

import "net/url"

type (
	ErrorReport struct {
		Notifier    ErrorReportNotifier    `json:"notifier"`
		Errors      []ErrorReportError     `json:"errors"`
		Context     map[string]interface{} `json:"context"`
		Params      map[string]interface{} `json:"params"`
		Environment map[string]interface{} `json:"environment"`
		Session     map[string]interface{} `json:"session"`
		Framework   string                 `json:"framework"`
	}

	ErrorReportNotifier struct {
		Name    string `json:"name"`
		Version string `json:"version"`
		Url     string `json:"url"`
	}

	ErrorReportBacktrace struct {
		Method string `json:"function"`
		File   string `json:"file"`
		Number *int   `json:"line"`
		Column *int   `json:"column"`
	}

	ErrorReportError struct {
		Type       string                 `json:"type"`
		Message    string                 `json:"message"`
		Backtraces []ErrorReportBacktrace `json:"backtrace"`
	}
)

func (r ErrorReport) hostname() string {
	hostname := asString(r.Context["hostname"])
	if hostname != "" {
		return hostname
	}
	u := asString(r.Context["url"])
	parsed, _ := url.Parse(u)
	return parsed.Host
}

func (r ErrorReport) userAttributes() map[string]interface{} {
	if user, ok := r.Context["user"]; ok {
		return map[string]interface{}{
			"user": user,
		}
	}
	return map[string]interface{}{
		"id":       r.Context["userId"],
		"name":     r.Context["userName"],
		"email":    r.Context["userEmail"],
		"username": r.Context["userUsername"],
	}
}

func (e ErrorReportError) backtraces() (b []Backtrace) {
	for _, _b := range e.Backtraces {
		b = append(b, Backtrace{
			Method: _b.Method,
			File:   _b.File,
			Number: _b.Number,
			Column: _b.Column,
		})
	}
	return
}

func (r ErrorReport) MakeNotice() Notice {
	firstErr := r.Errors[0]
	environment := r.Environment
	environment["HTTP_USER_AGENT"] = r.Context["userAgent"]
	return Notice{
		Message:    firstErr.Message,
		ErrorClass: firstErr.Type,
		Backtraces: firstErr.backtraces(),
		Request: Request{
			CGIData:   environment,
			Session:   r.Session,
			Params:    r.Params,
			Url:       asString(r.Context["url"]),
			Component: asString(r.Context["component"]),
			Action:    asString(r.Context["action"]),
		},
		ServerEnvironment: ServerEnvironment{
			EnvironmentName: asString(r.Context["environment"]),
			Hostname:        r.hostname(),
			ProjectRoot:     asString(r.Context["rootDirectory"]),
			AppVersion:      asString(r.Context["version"]),
		},
		Notifier: Notifier{
			Name:    r.Notifier.Name,
			Version: r.Notifier.Version,
			Url:     r.Notifier.Url,
		},
		UserAttributes: r.userAttributes(),
		Framework:      r.Framework,
	}
}
