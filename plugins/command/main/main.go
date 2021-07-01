package main

import "C"
import (
	"github.com/caiguanhao/goerrbit/plugins/command"
)

var (
	Name        = command.Name
	Description = command.Description
)

//export New
func New() interface{} {
	return command.New()
}

func main() {
}
