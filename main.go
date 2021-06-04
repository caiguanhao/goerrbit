package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"math/rand"
	"os"
	"path/filepath"
	"time"

	"github.com/caiguanhao/goerrbit/app/configs"
	"github.com/caiguanhao/goerrbit/app/controllers"
	"github.com/caiguanhao/goerrbit/app/migrations"
	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/caiguanhao/goerrbit/frontend"
	"github.com/gopsql/logger"
	"github.com/gopsql/migrator"
	"github.com/gopsql/pgx"
	"github.com/gopsql/psql"
)

func main() {
	defaultConfigFile := ".goerrbit.go"
	if home, _ := os.UserHomeDir(); home != "" {
		defaultConfigFile = filepath.Join(home, defaultConfigFile)
	}
	toMigrate := flag.Bool("migrate", false, "run migrations and exit")
	toRollback := flag.Bool("rollback", false, "rollback the last migration and exit")
	toCreateMigration := flag.Bool("create-migration", false, "create new migration and exit")
	toPrintRoutes := flag.Bool("routes", false, "print routes and exit")
	listenAddr := flag.String("listen", "127.0.0.1:10000", "http server address")
	configFile := flag.String("configs", defaultConfigFile, "location of the config file")
	createConfig := flag.Bool("create-configs", false, "create (update if exists) config file and exit")
	createAdmin := flag.Bool("create-admin", false, "create admin with random name and password and exit")
	flag.Parse()

	log := logger.StandardLogger

	if *toCreateMigration {
		var path string
		var err error
		if os.Getenv("FROM_MODELS") == "1" {
			path, err = migrator.CreateNewMigrationFromModels("app/migrations",
				models.User{}, models.UserSession{})
		} else {
			path, err = migrator.CreateNewMigration("app/migrations")
		}
		if err != nil {
			log.Fatal(err)
		}
		log.Info("written", path)
		return
	}

	config := configs.ReadWriteConfigs(*configFile, *createConfig)

	conn, err := pgx.Open(config.PostgresDatabaseConnectionURL)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	if *createAdmin {
		m := psql.NewModel(models.User{}, conn, log)
		name := randomString(6)
		password := randomString(20)
		user := models.NewUser(name, password)
		user.IsAdmin = true
		m.Insert(m.Permit("Name", "Password", "IsAdmin").Filter(user))().MustExecute()
		fmt.Println("New admin user has been created:")
		fmt.Println("  - name:", name)
		fmt.Println("  - password:", password)
		return
	}

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

	e := controllers.New(conn, log, config, frontend.FS)

	if *toPrintRoutes {
		data, _ := json.MarshalIndent(e.Routes(), "", "  ")
		fmt.Println(string(data))
		return
	}

	e.Logger.Fatal(e.Start(*listenAddr))
}

func randomString(n int) string {
	rand.Seed(time.Now().UnixNano())
	const letterBytes = "abcdefghijklmnopqrstuvwxyz"
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}
