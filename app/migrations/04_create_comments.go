package migrations

func init() {
	add(migration{
		version: 4,
		up: `
CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	problem_id bigint DEFAULT 0 NOT NULL,
	user_id bigint DEFAULT 0 NOT NULL,
	body text DEFAULT ''::text NOT NULL,
	created_at timestamptz DEFAULT NOW() NOT NULL,
	updated_at timestamptz DEFAULT NOW() NOT NULL
);
`,
		down: `
DROP TABLE IF EXISTS comments;
`,
	})
}
