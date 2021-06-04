package migrations

func init() {
	add(migration{
		version: 2,
		up: `
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name text DEFAULT ''::text NOT NULL,
	password text DEFAULT ''::text NOT NULL,
	is_admin boolean DEFAULT false NOT NULL,
	created_at timestamptz DEFAULT NOW() NOT NULL,
	updated_at timestamptz DEFAULT NOW() NOT NULL,
	deleted_at timestamptz
);

CREATE UNIQUE INDEX unique_user ON users USING btree (lower(name));

CREATE TABLE user_sessions (
	id SERIAL PRIMARY KEY,
	user_id bigint DEFAULT 0 NOT NULL,
	session_id UUID NOT NULL DEFAULT gen_random_uuid(),
	ip_address text DEFAULT ''::text NOT NULL,
	user_agent text DEFAULT ''::text NOT NULL,
	created_at timestamptz DEFAULT NOW() NOT NULL,
	updated_at timestamptz DEFAULT NOW() NOT NULL
);
`,
		down: `
DROP TABLE IF EXISTS user_sessions;

DROP TABLE IF EXISTS users;
`,
	})
}
