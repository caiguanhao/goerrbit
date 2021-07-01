package command

import (
	"bytes"
	"encoding/json"
	"errors"
	"os/exec"
	"text/template"

	"github.com/google/shlex"
)

type (
	Command struct {
		Command string `validate:"required" label:"Command" placeholder:"Command to execute"`
	}
)

var (
	Name        = "command"
	Description = `Execute an external command. [README](https://github.com/caiguanhao/goerrbit/tree/master/plugins/command)`
)

func New() interface{} {
	return Command{}
}

func (command Command) CreateNotification(problem map[string]string) error {
	tmpl, err := template.New("").Parse(command.Command)
	if err != nil {
		return err
	}
	var buf bytes.Buffer
	err = tmpl.Execute(&buf, problem)
	if err != nil {
		return err
	}
	parsed, err := shlex.Split(buf.String())
	if err != nil {
		return err
	}
	if len(parsed) == 0 {
		return errors.New("no command")
	}
	cmd := exec.Command(parsed[0], parsed[1:]...)
	b, _ := json.Marshal(problem)
	cmd.Stdin = bytes.NewReader(append(b, '\n'))
	return cmd.Run()
}
