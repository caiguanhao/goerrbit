package models

import (
	"fmt"
	"net/http"
	"net/url"
	"os"
	"runtime"
	"strings"
)

type (
	ErrorReport struct {
		Notifier    ErrorReportNotifier    `json:"notifier"`
		Errors      []ErrorReportError     `json:"errors"`
		Context     map[string]interface{} `json:"context"`
		Params      map[string]interface{} `json:"params"`
		Environment map[string]interface{} `json:"environment"`
		Session     map[string]interface{} `json:"session"`
		Framework   string                 `json:"framework"`
		Key         string                 `json:"key"`
		ProjectId   string                 `json:"project_id"`
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
		if u, ok := user.(map[string]interface{}); ok {
			return u
		}
		return map[string]interface{}{
			"user": user,
		}
	}
	attrs := map[string]interface{}{}
	if v, ok := r.Context["userId"]; ok {
		attrs["id"] = v
	}
	if v, ok := r.Context["userName"]; ok {
		attrs["name"] = v
	}
	if v, ok := r.Context["userEmail"]; ok {
		attrs["email"] = v
	}
	if v, ok := r.Context["userUsername"]; ok {
		attrs["username"] = v
	}
	return attrs
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

func NewErrorReport(err interface{}, req *http.Request, skip int) ErrorReport {
	packageName, backtrace := getBacktrace(err, skip+1)
	report := ErrorReport{
		Errors: []ErrorReportError{
			{
				Type:       fmt.Sprintf("%T", err),
				Message:    fmt.Sprint(err),
				Backtraces: backtrace,
			},
		},
		Context: map[string]interface{}{
			"language":     runtime.Version(),
			"os":           runtime.GOOS,
			"architecture": runtime.GOARCH,
			"component":    packageName,
			"environment":  "production",
		},
		Params:      make(map[string]interface{}),
		Environment: make(map[string]interface{}),
		Session:     make(map[string]interface{}),
	}
	if s, err := os.Hostname(); err == nil {
		report.Context["hostname"] = s
	}
	if wd, err := os.Getwd(); err == nil {
		report.Context["rootDirectory"] = wd
	}
	if req != nil {
		report.Context["url"] = req.URL.String()
		if ua := req.Header.Get("User-Agent"); ua != "" {
			report.Context["userAgent"] = ua
		}
		for k, v := range req.Header {
			if len(v) == 1 {
				report.Environment[k] = v[0]
			} else {
				report.Environment[k] = v
			}
		}
	}
	return report
}

// from github.com/airbrake/gobrake
func getBacktrace(e interface{}, skip int) (string, []ErrorReportBacktrace) {
	const depth = 32
	var pcs [depth]uintptr
	n := runtime.Callers(skip+1, pcs[:])
	ff := runtime.CallersFrames(pcs[:n])

	var firstPkg string
	frames := make([]ErrorReportBacktrace, 0)
	for {
		f, ok := ff.Next()
		if !ok {
			break
		}

		pkg, fn := splitPackageFuncName(f.Function)
		if firstPkg == "" && pkg != "runtime" {
			firstPkg = pkg
		}

		if stackFilter(pkg, fn, f.File, f.Line) {
			frames = frames[:0]
			continue
		}

		number := f.Line
		frames = append(frames, ErrorReportBacktrace{
			File:   f.File,
			Number: &number,
			Method: fn,
		})
	}

	return firstPkg, frames
}

// from github.com/airbrake/gobrake
func stackFilter(packageName, funcName string, file string, line int) bool {
	return packageName == "runtime" && funcName == "panic"
}

// from github.com/airbrake/gobrake
func splitPackageFuncName(funcName string) (string, string) {
	var packageName string
	if ind := strings.LastIndex(funcName, "/"); ind > 0 {
		packageName += funcName[:ind+1]
		funcName = funcName[ind+1:]
	}
	if ind := strings.Index(funcName, "."); ind > 0 {
		packageName += funcName[:ind]
		funcName = funcName[ind+1:]
	}
	return packageName, funcName
}
