package cli

import (
	"context"
	"flag"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/caiguanhao/goerrbit/app/configs"
	"github.com/caiguanhao/goerrbit/app/controllers"
	"github.com/caiguanhao/goerrbit/app/migrations"
	"github.com/caiguanhao/goerrbit/app/models"
	"github.com/caiguanhao/goerrbit/frontend"
	"github.com/caiguanhao/goerrbit/plugins"
	"github.com/gopsql/logger"
	"github.com/gopsql/migrator"
	"github.com/gopsql/pgx"
	"github.com/gopsql/psql"
	"github.com/labstack/echo/v4"
)

type (
	Main struct {
		Services plugins.Plugins
	}
)

func (main Main) Run() {
	defaultConfigFile := ".goerrbit.go"
	if home, _ := os.UserHomeDir(); home != "" {
		defaultConfigFile = filepath.Join(home, defaultConfigFile)
	}
	toMigrate := flag.Bool("migrate", false, "run migrations and exit")
	toRollback := flag.Bool("rollback", false, "rollback the last migration and exit")
	toCreateMigration := flag.Bool("create-migration", false, "create new migration and exit")
	toPrintRoutes := flag.Bool("routes", false, "print routes and exit")
	configFile := flag.String("c", defaultConfigFile, "location of the config file")
	createConfig := flag.Bool("C", false, "create (update if exists) config file and exit")
	toLogin := flag.Bool("login", false, "reset password of first admin (create if not exists) and exit")
	showVersion := flag.Bool("version", false, "print version and exit")
	flag.Parse()

	if *showVersion {
		fmt.Println(VERSION)
		return
	}

	log := logger.StandardLogger

	if *toCreateMigration {
		var path string
		var err error
		if os.Getenv("FROM_MODELS") == "1" {
			path, err = migrator.CreateNewMigrationFromModels("app/migrations",
				models.NotificationService{})
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

	if *toLogin {
		m := psql.NewModel(models.User{}, conn, log)
		var name string
		m.Select("name", "WHERE is_admin IS TRUE ORDER BY id ASC").QueryRow(&name)
		password := randomString(8)
		if name == "" {
			name = "admin"
			user := models.NewUser(name, password)
			user.IsAdmin = true
			m.Insert(m.Permit("Name", "Password", "IsAdmin").Filter(user))(
				"ON CONFLICT (lower(name)) DO UPDATE SET " +
					"deleted_at = NULL, " +
					"is_admin = EXCLUDED.is_admin, " +
					"password = EXCLUDED.password",
			).MustExecute()
			log.Info("New admin user has been created:")
			log.Info("  - name:", name)
			log.Info("  - password:", password)
		} else {
			user := models.NewUser(name, password)
			user.DeletedAt = nil
			m.Update(m.Permit("Password", "DeletedAt").Filter(user))("WHERE name = $1", name).MustExecute()
			log.Info("Password of admin user has been reset:")
			log.Info("  - name:", name)
			log.Info("  - password:", password)
		}
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
		printRoutes(e.Routes())
		return
	}

	soFiles := plugins.Find(config.PluginsDirectory)
	for _, path := range soFiles {
		p, err := plugins.Open(path)
		if err != nil {
			log.Error("error opening plugin", path, err)
			continue
		}
		log.Info("opened", path)
		main.Services = append(main.Services, p)
	}

	e.Pre(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("Services", main.Services)
			return next(c)
		}
	})

	log.Info("listening", config.ListenAddress)
	go func() {
		if err := e.Start(config.ListenAddress); err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}()
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}
}

func randomString(n int) string {
	rand.Seed(time.Now().UnixNano())
	const letterBytes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

type ByRouteName [][]string

func (a ByRouteName) Len() int           { return len(a) }
func (a ByRouteName) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByRouteName) Less(i, j int) bool { return a[i][2] < a[j][2] }

func printRoutes(routes []*echo.Route) {
	cols := []int{1, 1, 1}
	data := [][]string{}
	for _, route := range routes {
		i := strings.LastIndex(route.Name, "/")
		if i < 0 || !strings.Contains(route.Name, "goerrbit") {
			continue
		}
		name := strings.TrimSuffix(route.Name[i+1:], "-fm")
		row := []string{route.Method, route.Path, name}
		for i := range cols {
			if len(row[i]) > cols[i] {
				cols[i] = len(row[i])
			}
		}
		data = append(data, row)
	}
	sort.Sort(ByRouteName(data))
	format := fmt.Sprintf("%%-%ds  %%-%ds  %%-%ds\n", cols[0], cols[1], cols[2])
	fmt.Printf(format, "METHOD", "PATH", "NAME")
	for i := range data {
		fmt.Printf(format, data[i][0], data[i][1], data[i][2])
	}
}
