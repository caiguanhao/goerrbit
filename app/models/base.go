package models

import (
	"crypto/md5"
	"fmt"
)

func asString(i interface{}) string {
	s, ok := i.(string)
	if !ok {
		return ""
	}
	return s
}

func md5String(i string) string {
	return fmt.Sprintf("%x", md5.Sum([]byte(i)))
}
