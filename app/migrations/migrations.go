package migrations

var (
	Migrations []migration
)

type (
	migration struct {
		version int
		up      string
		down    string
	}
)

func add(m migration) {
	Migrations = append(Migrations, m)
}
