module github.com/caiguanhao/goerrbit/app/cli/goerrbit

go 1.15

replace (
	github.com/caiguanhao/goerrbit => ../../../
	github.com/caiguanhao/goerrbit/plugins/lark => ../../../plugins/lark/
)

require (
	github.com/caiguanhao/goerrbit v1.1.1-0.20210613085837-c3261f1fd427
	github.com/caiguanhao/goerrbit/plugins/lark v0.0.0-20210613085837-c3261f1fd427
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/go-playground/validator/v10 v10.6.1
	github.com/gopsql/bcrypt v1.0.0
	github.com/gopsql/db v1.0.0
	github.com/gopsql/goconf v1.1.0
	github.com/gopsql/logger v1.0.0
	github.com/gopsql/migrator v1.0.0
	github.com/gopsql/pagination/v2 v2.0.1
	github.com/gopsql/pgx v1.0.0
	github.com/gopsql/psql v1.0.1
	github.com/labstack/echo/v4 v4.3.0
	github.com/mssola/user_agent v0.5.3
)
