package plugins

import (
	"encoding/json"
	"errors"
	"os"
	"path/filepath"
	"plugin"
	"reflect"

	"github.com/gopsql/psql"
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
		Name         string
		Label        string
		Type         string
		Hint         string
		Placeholder  string
		DefaultValue interface{}
	}

	NotificationService interface {
		CreateNotification(map[string]string) error
	}
)

func (plugin Plugin) CreateNotification(options interface{}, notification map[string]string) error {
	instance := reflect.New(reflect.TypeOf(plugin.New()))
	m := psql.NewModel(instance.Elem().Interface())
	m.MustAssign(
		instance.Interface(),
		m.PermitAllExcept().Filter(options),
	)
	i := instance.Elem().Interface().(NotificationService)
	return i.CreateNotification(notification)
}

func (plugins Plugins) FindByName(name string) *Plugin {
	for _, plugin := range plugins {
		if name != plugin.Name {
			continue
		}
		return plugin
	}
	return nil
}

func (f pluginNewFunc) ProtectedFields() (fields []string) {
	instance := f()
	rt := reflect.TypeOf(instance)
	for i := 0; i < rt.NumField(); i++ {
		f := rt.Field(i)
		if f.Tag.Get("type") == "password" {
			fields = append(fields, f.Name)
		}
	}
	return
}

func (f pluginNewFunc) MarshalJSON() ([]byte, error) {
	instance := f()
	fields := []pluginField{}
	rt := reflect.TypeOf(instance)
	rv := reflect.ValueOf(instance)
	for i := 0; i < rt.NumField(); i++ {
		f := rt.Field(i)
		if f.PkgPath != "" { // ignore unexported fields
			continue
		}
		fields = append(fields, pluginField{
			Name:         f.Name,
			Label:        f.Tag.Get("label"),
			Type:         f.Tag.Get("type"),
			Hint:         f.Tag.Get("hint"),
			Placeholder:  f.Tag.Get("placeholder"),
			DefaultValue: rv.Field(i).Interface(),
		})
	}
	return json.Marshal(fields)
}

func Open(path string) (*Plugin, error) {
	p, err := plugin.Open(path)
	if err != nil {
		return nil, err
	}
	name := getString(p, "Name")
	if name == "" {
		return nil, errors.New("Name was not found")
	}
	description := getString(p, "Description")
	n, err := p.Lookup("New")
	if err != nil {
		return nil, err
	}
	nFunc, ok := n.(func() interface{})
	if !ok {
		return nil, errors.New("New was not found")
	}
	return &Plugin{
		Name:        name,
		Description: description,
		New:         nFunc,
	}, nil
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
