package lark

import (
	"bytes"
	"encoding/json"
	"text/template"

	"github.com/caiguanhao/larkslim"
)

type (
	Lark struct {
		AppId     string `validate:"required" label:"App ID" placeholder:"Lark App ID"`
		AppSecret string `validate:"required" type:"password" label:"App Secret" placeholder:"Lark App Secret"`
		Target    string `validate:"required" label:"Target" hint:"ID of a chat or user" placeholder:"Chat or user"`
		MsgType   msgtyp `validate:"oneof=0 1" type:"select" label:"Message Type"`
		Template  string `label:"Template" type:"textarea" placeholder:"Leave this blank to use default template"`
	}

	msgtyp int
)

func (msgtyp) Options() [][]interface{} {
	return [][]interface{}{
		{0, "Text message"},
		{1, "Rich text message (post)"},
	}
}

var (
	Name        = "lark"
	Description = "Send error messages to Lark"

	DefaultTemplate = `{{.Message}}
{{.AppName}} ({{.Environment}})
{{.ErrorClass}} ({{.Location}})
{{.Url}}`
	DefaultPostTemplate = `{
  "en_us": {
    "title": {{printf "%q" .Message}},
    "content": [[
      { "tag": "text", "text": "App: " },
      { "tag": "text", "text": {{printf "%s (%s)" .AppName .Environment | printf "%q"}} }
    ], [
      { "tag": "text", "text": "Error: " },
      { "tag": "text", "text": {{printf "%q" .ErrorClass}} }
    ], [
      { "tag": "text", "text": "Where: " },
      { "tag": "text", "text": {{printf "%q" .Location}} }
    ], [
      { "tag": "a", "text": "Details", "href": {{printf "%q" .Url}} }
    ]]
  },
  "zh_cn": {
    "title": {{printf "%q" .Message}},
    "content": [[
      { "tag": "text", "text": "应用: " },
      { "tag": "text", "text": {{printf "%s (%s)" .AppName .Environment | printf "%q"}} }
    ], [
      { "tag": "text", "text": "错误: " },
      { "tag": "text", "text": {{printf "%q" .ErrorClass}} }
    ], [
      { "tag": "text", "text": "位置: " },
      { "tag": "text", "text": {{printf "%q" .Location}} }
    ], [
      { "tag": "a", "text": "详情", "href": {{printf "%q" .Url}} }
    ]]
  }
}`
)

func New() interface{} {
	return Lark{}
}

func (lark Lark) CreateNotification(problem map[string]string) error {
	var tpl string
	if lark.Template == "" {
		if lark.MsgType == 1 {
			tpl = DefaultPostTemplate
		} else {
			tpl = DefaultTemplate
		}
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
	if lark.MsgType == 1 {
		var post larkslim.Post
		json.Unmarshal(buf.Bytes(), &post)
		return api.SendPost(lark.Target, post)
	}
	return api.SendMessage(lark.Target, buf.String())
}
