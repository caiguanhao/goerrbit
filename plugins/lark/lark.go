package lark

import (
	"bytes"
	"text/template"

	"github.com/caiguanhao/larkslim"
)

type (
	Lark struct {
		AppId     string `validate:"required" label:"App ID" placeholder:"Lark App ID"`
		AppSecret string `validate:"required" label:"App Secret" placeholder:"Lark App Secret"`
		Target    string `validate:"required" label:"Target" hint:"ID of a chat or user" placeholder:"Chat or user"`
		Template  string `label:"Template" type:"textarea" placeholder:"Leave this blank to use default template"`
	}
)

var (
	Name        = "lark"
	Description = "Send error messages to Lark"

	DefaultTemplate = `Error: {{.ErrorClass}}
App: {{.AppName}}
Env: {{.Environment}}
Where: {{.Location}}
Url: {{.Url}}`
)

func New() interface{} {
	return Lark{}
}

func (lark Lark) CreateNotification(problem map[string]string) error {
	var tpl string
	if lark.Template == "" {
		tpl = DefaultTemplate
	} else {
		tpl = lark.Template
	}
	tmpl, err := template.New("").Parse(tpl)
	if err != nil {
		return err
	}
	var buf bytes.Buffer
	err = tmpl.Execute(&buf, problem)
	if err != nil {
		return err
	}
	api := larkslim.API{
		AppId:     lark.AppId,
		AppSecret: lark.AppSecret,
	}
	_, err = api.GetAccessToken()
	if err != nil {
		return err
	}
	return api.SendMessage(lark.Target, buf.String())
}
