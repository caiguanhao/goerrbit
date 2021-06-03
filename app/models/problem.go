package models

import (
	"encoding/json"
	"math/big"
	"sort"
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

		UserAgents ValueWithCountMap `jsonb:"meta"`
		Messages   ValueWithCountMap `jsonb:"meta"`
		Hosts      ValueWithCountMap `jsonb:"meta"`

		NoticesCount  int
		LastNoticeId  int
		LastNoticeAt  time.Time
		FirstNoticeAt time.Time
		ResolvedAt    *time.Time
	}

	ValueWithCountMap map[string]ValueWithCount

	ValueWithCount struct {
		Value string
		Count int
	}

	PercentageTable []Percentage

	Percent int

	Percentage struct {
		Value   string
		Percent Percent
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
jsonb_set({column}, ARRAY[$2, $3, 'Count'], to_jsonb(({column}->$2->$3->>'Count')::int + 1))
END
WHERE id = $1`
	sql = strings.NewReplacer("{table}", table, "{column}", column).Replace(sql)
	sql = strings.Replace(sql, "\n", " ", -1)
	return sql
}

type ByPercent []Percentage

func (a ByPercent) Len() int           { return len(a) }
func (a ByPercent) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByPercent) Less(i, j int) bool { return a[i].Percent > a[j].Percent }

func (p Percent) MarshalJSON() ([]byte, error) {
	return json.Marshal(big.NewRat(int64(p), 100).FloatString(2) + "%")
}

func (m ValueWithCountMap) ToPercentageTable() (table PercentageTable) {
	total := 0
	for _, v := range m {
		total += v.Count
	}
	if total == 0 {
		return
	}
	sum := 0
	for _, v := range m {
		percent := v.Count * 10000 / total
		table = append(table, Percentage{
			Value:   v.Value,
			Percent: Percent(percent),
		})
		sum += percent
	}
	sort.Sort(ByPercent(table))
	diff := 10000 - sum
	table[len(table)-1].Percent += Percent(diff)
	return
}
