package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"os"

	"github.com/caiguanhao/goerrbit/app/controllers"
	"github.com/caiguanhao/goerrbit/app/migrations"
	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/caiguanhao/goerrbit/frontend"
	"github.com/gopsql/logger"
	"github.com/gopsql/migrator"
	"github.com/gopsql/pgx"
)

func main() {
	toMigrate := flag.Bool("migrate", false, "run migrations and exit")
	toRollback := flag.Bool("rollback", false, "rollback the last migration and exit")
	toCreateMigration := flag.Bool("create-migration", false, "create new migration and exit")
	toPrintRoutes := flag.Bool("routes", false, "print routes and exit")
	listenAddr := flag.String("listen", "127.0.0.1:10000", "http server address")
	flag.Parse()

	log := logger.StandardLogger

	if *toCreateMigration {
		var path string
		var err error
		if os.Getenv("FROM_MODELS") == "1" {
			path, err = migrator.CreateNewMigrationFromModels("app/migrations",
				models.App{}, models.Problem{}, models.Notice{})
		} else {
			path, err = migrator.CreateNewMigration("app/migrations")
		}
		if err != nil {
			log.Fatal(err)
		}
		log.Info("written", path)
		return
	}

	dbStr := os.Getenv("PGCONN")
	if dbStr == "" {
		dbStr = "postgres://localhost:5432/goerrbit?sslmode=disable"
	}
	conn, err := pgx.Open(dbStr)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	m := &migrator.Migrator{
		Scope:  "goerrbit",
		DB:     conn,
		Logger: log,
	}
	m.SetMigrations(migrations.Migrations)

	if *toMigrate {
		m.Migrate()
		return
	}

	if *toRollback {
		m.Rollback()
		return
	}

	e := controllers.New(conn, log, frontend.FS)

	if *toPrintRoutes {
		data, _ := json.MarshalIndent(e.Routes(), "", "  ")
		fmt.Println(string(data))
		return
	}

	e.Logger.Fatal(e.Start(*listenAddr))
}
