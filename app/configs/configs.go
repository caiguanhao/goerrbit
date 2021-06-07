package configs

import (
	"bytes"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"io/ioutil"
	"log"
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/gopsql/goconf"
)

type (
	Configs struct {
		Prefix string `
URL prefix for frontend pages.
`

		PostgresDatabaseConnectionURL string `
Connect to PostgreSQL database using a URL like this:
postgres://user:password@host:port/dbname?sslmode=disable
Docs: https://pkg.go.dev/github.com/lib/pq#hdr-Connection_String_Parameters
`
		SessionPrivateKey SessionPrivateKey `
Private key used when generating session token. To generate new key, remove
this config or leave this empty, and then save this file and run with option
--create-configs.
`
	}

	SessionPrivateKey struct {
		*rsa.PrivateKey
		*rsa.PublicKey
	}
)

func ReadConfigs(file string) (conf *Configs, err error) {
	var content []byte
	content, err = ioutil.ReadFile(file)
	if err != nil {
		if os.IsNotExist(err) {
			conf = &Configs{}
		}
		return
	}
	var c Configs
	err = goconf.Unmarshal([]byte(content), &c)
	if err == nil {
		conf = &c
	}
	return
}

func WriteConfigs(file string, conf *Configs) (err error) {
	if conf == nil {
		return
	}
	if conf.Prefix == "" {
		conf.Prefix = "https://www.example.com"
	}
	if conf.PostgresDatabaseConnectionURL == "" {
		conf.PostgresDatabaseConnectionURL = "postgres://localhost:5432/goerrbit?sslmode=disable"
	}
	if conf.SessionPrivateKey.PrivateKey == nil {
		var privatekey *rsa.PrivateKey
		privatekey, err = rsa.GenerateKey(rand.Reader, 2048)
		if err != nil {
			return
		}
		conf.SessionPrivateKey = SessionPrivateKey{privatekey, &privatekey.PublicKey}
	}
	var content []byte
	content, err = goconf.Marshal(*conf)
	if err != nil {
		return
	}
	return ioutil.WriteFile(file, content, 0600)
}

func ReadWriteConfigs(file string, create bool) *Configs {
	config, err := ReadConfigs(file)
	if err != nil && config == nil {
		log.Fatal(err)
	}
	if err != nil || create {
		err := WriteConfigs(file, config)
		if err != nil {
			log.Fatal(err)
		}
		log.Println("Config file written:", file)
		os.Exit(0)
	}
	return config
}

func (s *SessionPrivateKey) SetString(input string) (err error) {
	if input == "" {
		return nil
	}
	privKey, err := jwt.ParseRSAPrivateKeyFromPEM([]byte(input))
	if err != nil {
		return err
	}
	pubKeyBytes, err := x509.MarshalPKIXPublicKey(&privKey.PublicKey)
	if err != nil {
		return err
	}
	publicKey, err := jwt.ParseRSAPublicKeyFromPEM(pem.EncodeToMemory(
		&pem.Block{
			Type:  "RSA PUBLIC KEY",
			Bytes: pubKeyBytes,
		},
	))
	s.PrivateKey = privKey
	s.PublicKey = publicKey
	return nil
}

func (s SessionPrivateKey) String() string {
	var buffer bytes.Buffer
	err := pem.Encode(&buffer, &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(s.PrivateKey),
	})
	if err != nil {
		return ""
	}
	return buffer.String()
}
