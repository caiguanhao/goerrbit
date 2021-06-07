package migrations

func init() {
	add(migration{
		version: 3,
		up: `
CREATE TABLE notification_services (
	id SERIAL PRIMARY KEY,
	app_id bigint DEFAULT 0 NOT NULL,
	enabled boolean DEFAULT false NOT NULL,
	name text DEFAULT ''::text NOT NULL,
	created_at timestamptz DEFAULT NOW() NOT NULL,
	updated_at timestamptz DEFAULT NOW() NOT NULL,
	meta jsonb DEFAULT '{}'::jsonb NOT NULL
);
`,
		down: `
DROP TABLE IF EXISTS notification_services;
`,
	})
}
