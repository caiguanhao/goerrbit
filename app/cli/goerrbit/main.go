package main

import (
	"github.com/caiguanhao/goerrbit/app/cli"
	"github.com/caiguanhao/goerrbit/plugins"
	"github.com/caiguanhao/goerrbit/plugins/lark"
)

func main() {
	cli.Main{
		Services: plugins.Plugins{
			{
				Name:        lark.Name,
				Description: lark.Description,
				New:         lark.New,
			},
		},
	}.Run()
}
