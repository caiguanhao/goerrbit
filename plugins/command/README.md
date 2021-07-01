# command

Execute an external command.

Example:

1. Append stdin content to a file:

```
tee -a {{printf "%s.txt" .AppName | printf "%q"}}
```

2. Create a macOS notification using [terminal-notifier](https://github.com/julienXX/terminal-notifier):

```
terminal-notifier -title {{printf "%q" .Message}} -message {{printf "%s (%s)" .AppName .Environment | printf "%q"}} -open {{printf "%q" .Url}}
```

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
