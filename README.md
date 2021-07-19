# goerrbit

Simplified [errbit](https://github.com/errbit/errbit)
(Airbrake API compliant error catcher) written in Go.

Requirements: PostgreSQL 9.6+

## Install

You can go to [Downloads](https://github.com/caiguanhao/goerrbit/releases) page
to download goerrbit or build it by your own.

To build `goerrbit`, you must download and [install Go](https://golang.org/dl/)
on your system first.

Get `goerrbit` (server only):

```
go get -v -u github.com/caiguanhao/goerrbit
```

Get `goerrbit` with [frontend files](https://github.com/caiguanhao/goerrbit.vue)
(needs at least Go 1.16):

```
go get -v -u -tags frontend github.com/caiguanhao/goerrbit
```

Build `goerrbit` with all plugins (especially good for Windows, since it can't
use plugins):

```
go get -v -u -tags frontend github.com/caiguanhao/goerrbit/app/cli/goerrbit
```

## Setup

Create database first, for example:

```
sudo su postgres
psql
CREATE DATABASE goerrbit;
CREATE ROLE goerrbit LOGIN PASSWORD 'goerrbit';
GRANT ALL ON DATABASE goerrbit TO goerrbit;
```

Create config file:

```
goerrbit -C
```

Edit ~/.goerrbit.go and update PostgreSQL connection string:

```
PostgresDatabaseConnectionURL = "postgres://goerrbit:goerrbit@localhost:5432/goerrbit?sslmode=disable"
```

Run database migrations:

```
goerrbit -migrate
```

Start server:

```
goerrbit
```

Example nginx config:

```nginx
server {
        listen 80;
        server_name errbit.your-domain.com;
        return 301 https://$host$request_uri;
}

server {
        listen 443 ssl http2;
        server_name errbit.your-domain.com;
        ssl_certificate /etc/nginx/certs/your-domain.cert;
        ssl_certificate_key /etc/nginx/certs/your-domain.key;
        location / {
                proxy_pass http://127.0.0.1:8000;
        }
}
```

If you have [errbit](https://github.com/errbit/errbit) already, you can mirror
requests to goerrbit:

```nginx
server {
	listen 443 ssl http2;
	server_name existing-errbit.your-domain.com;

	location /mirror {
		internal;
		proxy_pass http://127.0.0.1:8000$request_uri;
	}

	location @airbrake {
		mirror /mirror;
		mirror_request_body on;
		# ...
	}

	# ...
}
```
