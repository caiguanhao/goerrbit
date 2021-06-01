package migrations

func init() {
	add(migration{
		version: 1,
		up: `
CREATE TABLE apps (
	id SERIAL PRIMARY KEY,
	name text DEFAULT ''::text NOT NULL,
	api_key text DEFAULT ''::text NOT NULL,
	created_at timestamptz DEFAULT NOW() NOT NULL,
	updated_at timestamptz DEFAULT NOW() NOT NULL,
	deleted_at timestamptz,
	meta jsonb DEFAULT '{}'::jsonb NOT NULL
);

CREATE UNIQUE INDEX unique_app ON apps USING btree (api_key);

CREATE TABLE problems (
	id SERIAL PRIMARY KEY,
	app_id bigint DEFAULT 0 NOT NULL,
	fingerprint text DEFAULT ''::text NOT NULL,
	message text DEFAULT ''::text NOT NULL,
	error_class text DEFAULT ''::text NOT NULL,
	environment text DEFAULT ''::text NOT NULL,
	location text DEFAULT ''::text NOT NULL,
	notices_count bigint DEFAULT 0 NOT NULL,
	last_notice_id bigint DEFAULT 0 NOT NULL,
	last_notice_at timestamptz DEFAULT NOW() NOT NULL,
	first_notice_at timestamptz DEFAULT NOW() NOT NULL,
	resolved_at timestamptz DEFAULT NOW(),
	meta jsonb DEFAULT '{}'::jsonb NOT NULL
);

CREATE UNIQUE INDEX unique_problem ON problems USING btree (app_id, fingerprint);

CREATE TABLE notices (
	id SERIAL PRIMARY KEY,
	problem_id bigint DEFAULT 0 NOT NULL,
	message text DEFAULT ''::text NOT NULL,
	error_class text DEFAULT ''::text NOT NULL,
	created_at timestamptz DEFAULT NOW() NOT NULL,
	meta jsonb DEFAULT '{}'::jsonb NOT NULL
);

CREATE INDEX index_notices_on_problem_id ON notices USING btree (problem_id);
`,
		down: `
DROP TABLE IF EXISTS notices;

DROP TABLE IF EXISTS problems;

DROP TABLE IF EXISTS apps;
`,
	})
}
