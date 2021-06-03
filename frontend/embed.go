// +build frontend

package frontend

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed dist/*
var frontend embed.FS

func init() {
	f, err := fs.Sub(frontend, "dist")
	if err != nil {
		panic(err)
	}
	FS = http.FS(f)
}
