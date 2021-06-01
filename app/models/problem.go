package models

import (
	"strings"
	"time"
)

type (
	Problem struct {
		Id    int
		AppId int

		Fingerprint string
		Message     string
		ErrorClass  string
		Environment string
		Location    string

		UserAgents map[string]ValueWithCount `jsonb:"meta"`
		Messages   map[string]ValueWithCount `jsonb:"meta"`
		Hosts      map[string]ValueWithCount `jsonb:"meta"`

		NoticesCount int

		LastNoticeAt  time.Time
		FirstNoticeAt time.Time
		ResolvedAt    *time.Time
	}

	ValueWithCount struct {
		Value string
		Count int
	}
)

func (Problem) AfterCreateSchema() string {
	return `CREATE UNIQUE INDEX unique_problem ON problems USING btree (app_id, fingerprint);`
}

// $1 is id, $2 is field name, $3 is key, $4 is value
func NewValueWithCountUpdateSQL(table, column string) string {
	sql := `UPDATE {table} SET {column} =
CASE WHEN {column}->$2->$3->'Count' IS NULL THEN
jsonb_set(
CASE WHEN {column}->$2 IS NULL THEN jsonb_set({column}, ARRAY[$2], '{}') ELSE {column} END
, ARRAY[$2, $3], jsonb_build_object('Count', 1, 'Value', $4::text))
ELSE
jsonb_set({column}, ARRAY[$2, $3, 'Count'], to_jsonb(({column}->$2->$3->'Count')::int + 1))
END
WHERE id = $1`
	sql = strings.NewReplacer("{table}", table, "{column}", column).Replace(sql)
	sql = strings.Replace(sql, "\n", " ", -1)
	return sql
}
