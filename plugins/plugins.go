package plugins

import (
	"encoding/json"
	"os"
	"path/filepath"
	"plugin"
	"reflect"
)

type (
	Plugin struct {
		Name        string
		Description string
		New         pluginNewFunc `json:"Fields"`
	}

	Plugins []*Plugin

	pluginNewFunc func() interface{}

	pluginField struct {
		Name        string
		Label       string
		Type        string
		Hint        string
		Placeholder string
	}

	NotificationService interface {
		CreateNotification(map[string]string) error
	}
)

func (plugins Plugins) FindByName(name string) *Plugin {
	for _, plugin := range plugins {
		if name != plugin.Name {
			continue
		}
		return plugin
	}
	return nil
}

func (f pluginNewFunc) MarshalJSON() ([]byte, error) {
	instance := f()
	fields := []pluginField{}
	rt := reflect.TypeOf(instance)
	for i := 0; i < rt.NumField(); i++ {
		f := rt.Field(i)
		fields = append(fields, pluginField{
			Name:        f.Name,
			Label:       f.Tag.Get("label"),
			Type:        f.Tag.Get("type"),
			Hint:        f.Tag.Get("hint"),
			Placeholder: f.Tag.Get("placeholder"),
		})
	}
	return json.Marshal(fields)
}

func Open(path string) *Plugin {
	p, err := plugin.Open(path)
	if err != nil {
		return nil
	}
	name := getString(p, "Name")
	if name == "" {
		return nil
	}
	description := getString(p, "Description")
	n, err := p.Lookup("New")
	if err != nil {
		return nil
	}
	nFunc, ok := n.(func() interface{})
	if !ok {
		return nil
	}
	return &Plugin{
		Name:        name,
		Description: description,
		New:         nFunc,
	}
}

func Find(dir string) []string {
	files := []string{}
	filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && filepath.Ext(path) == ".so" {
			files = append(files, path)
		}
		return nil
	})
	return files
}

func Load(paths []string) Plugins {
	plugins := Plugins{}
	for _, path := range paths {
		p := Open(path)
		if p == nil {
			continue
		}
		plugins = append(plugins, p)
	}
	return plugins
}

func getString(p *plugin.Plugin, name string) string {
	v, err := p.Lookup(name)
	if err != nil {
		return ""
	}
	value, ok := v.(*string)
	if !ok {
		return ""
	}
	return *value
}
