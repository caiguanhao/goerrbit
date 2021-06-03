# goerrbit

Simplified [errbit](https://github.com/errbit/errbit)
(Airbrake API compliant error catcher) written in Go.

Requirements: PostgreSQL 9.6+

## Install

Get `goerrbit` (server only):

```
go get -v -u github.com/caiguanhao/goerrbit
```

Get `goerrbit` with [frontend files](https://github.com/caiguanhao/goerrbit.vue)
(needs at least Go 1.16):

```
go get -v -u -tags frontend github.com/caiguanhao/goerrbit
```

## Usage

Run database migrations:

```
goerrbit -migrate
```

Start server:

```
goerrbit
```
