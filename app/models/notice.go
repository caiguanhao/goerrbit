package models

import (
	"fmt"
	"net/url"
	"regexp"
	"time"

	"github.com/mssola/user_agent"
)

type (
	Notice struct {
		Id                int
		ProblemId         int
		Message           string
		ErrorClass        string
		Backtraces        []Backtrace            `jsonb:"meta"`
		Request           Request                `jsonb:"meta"`
		ServerEnvironment ServerEnvironment      `jsonb:"meta"`
		Notifier          Notifier               `jsonb:"meta"`
		UserAttributes    map[string]interface{} `jsonb:"meta"`
		Framework         string                 `jsonb:"meta"`
		OldProblemId      int                    `jsonb:"meta"`
		CreatedAt         time.Time
	}

	Backtrace struct {
		Method string
		File   string
		Number *int
		Column *int
	}

	Request struct {
		CGIData   map[string]interface{}
		Session   map[string]interface{}
		Params    map[string]interface{}
		Url       string
		Component string
		Action    string
	}

	ServerEnvironment struct {
		EnvironmentName string
		Hostname        string
		ProjectRoot     string
		AppVersion      string
	}

	Notifier struct {
		Name    string
		Version string
		Url     string
	}
)

func (Notice) AfterCreateSchema() string {
	return `CREATE INDEX index_notices_on_problem_id ON notices USING btree (problem_id);`
}

var (
	reFilterMessage = regexp.MustCompile("(#<.+?):[0-9a-f]x[0-9a-f]+(>)")
)

// filter memory addresses out of object strings
// example: "#<Object:0x007fa2b33d9458>" becomes "#<Object>"
func (n Notice) FilteredMessage() string {
	return reFilterMessage.ReplaceAllString(n.Message, "$1$2")
}

func (n Notice) EnvironmentName() string {
	name := n.ServerEnvironment.EnvironmentName
	if name == "" {
		return "development"
	}
	return name
}

func (n Notice) Location() string {
	if n.Request.Action != "" {
		return n.Request.Component + "#" + n.Request.Action
	}
	return n.Request.Component
}

func (n Notice) Host() string {
	parsed, err := url.Parse(n.Request.Url)
	if err != nil || parsed.Host == "" {
		return "N/A"
	}
	return parsed.Host
}

func (n Notice) UserAgentString() string {
	str := asString(n.Request.CGIData["HTTP_USER_AGENT"])
	if str == "" {
		return "N/A"
	}
	ua := user_agent.New(str)
	browserName, browserVersion := ua.Browser()
	return fmt.Sprintf("%s %s (%s)", browserName, browserVersion, ua.OS())
}
