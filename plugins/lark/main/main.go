package main

import "C"
import (
	"github.com/caiguanhao/goerrbit/plugins/lark"
)

var (
	Name        = lark.Name
	Description = lark.Description
)

//export New
func New() interface{} {
	return lark.New()
}

func main() {
}
