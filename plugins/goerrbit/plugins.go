package main

import (
	"github.com/caiguanhao/goerrbit/plugins"
	"github.com/caiguanhao/goerrbit/plugins/lark"
)

func init() {
	services = append(services, &plugins.Plugin{
		Name:        lark.Name,
		Description: lark.Description,
		New:         lark.New,
	})
}
