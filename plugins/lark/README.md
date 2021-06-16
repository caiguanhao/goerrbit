# lark

Lark (Feishu) plugin for goerrbit.

1. Create app in <https://open.feishu.cn/app> and get the App ID and App Secret.

2. You can send plain text message or rich text message.
If you choose rich text message, you need to provide a JSON template.
For details of the JSON object structure, see
[Lark Docs](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json).

3. Template uses Golang's [text/template](https://golang.org/pkg/text/template/) package.

Currently, you can use these variables:

```
{{.Id}}
{{.AppId}}
{{.AppName}}
{{.Message}}
{{.ErrorClass}}
{{.Environment}}
{{.Location}}
{{.Url}}
{{.NoticesCount}}
{{.LastNoticeId}}
{{.LastNoticeAt}}
{{.FirstNoticeAt}}
```
