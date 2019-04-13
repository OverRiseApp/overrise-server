\c overrise  

CREATE TYPE JWT_TOKEN AS (
  role TEXT,
  user_id INTEGER
);

CREATE TYPE USER_TYPE AS ENUM ('standard_user');

CREATE TABLE "knex_migrations" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NULL,
  batch INTEGER NULL,
  migration_time TIMESTAMPTZ NULL
);

CREATE TABLE "knex_migrations_lock" (
  index SERIAL PRIMARY KEY,
  is_locked INTEGER NULL
);

----------
-- User --
----------
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  email_address TEXT NOT NULL DEFAULT '',
  user_type USER_TYPE NOT NULL DEFAULT 'standard_user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE private."user" (
  id SERIAL PRIMARY KEY REFERENCES public."user",
  hashed_password TEXT NOT NULL
);

CREATE UNIQUE INDEX email_address_idx ON "user"(email_address);

CREATE TRIGGER user_updated_at BEFORE UPDATE
  ON "user"
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;

------------------
-- Book Summary --
------------------
CREATE TABLE book_summary (
  id SERIAL PRIMARY KEY,
  summary TEXT NOT NULL DEFAULT '',
  user_id INT NOT NULL REFERENCES public."user"(id),
  book_id INT NOT NULL CHECK(book_id >= 1 AND book_id <= 66),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, book_id)
);

CREATE INDEX book_summary_user_id_idx ON book_summary(user_id);

CREATE TRIGGER book_summary_updated_at BEFORE UPDATE
  ON book_summary
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;

---------------------
-- Chapter Summary --
---------------------
CREATE TABLE chapter_summary (
  id SERIAL PRIMARY KEY,
  summary TEXT NOT NULL DEFAULT '',
  user_id INT NOT NULL REFERENCES public."user"(id),
  book_id INT NOT NULL CHECK(book_id >= 1 AND book_id <= 66),
  chapter INT NOT NULL CHECK(chapter >= 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX chapter_summary_user_id_idx ON chapter_summary(user_id);

CREATE TRIGGER chapter_summary_updated_at BEFORE UPDATE
  ON chapter_summary
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;

--------------------
-- Verses Summary --
--------------------
CREATE TABLE verses_summary (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  user_id INT NOT NULL REFERENCES public."user"(id),
  start_book_id INT NOT NULL CHECK(start_book_id >= 1 AND start_book_id <= 66),
  start_chapter INT NOT NULL CHECK(start_chapter >= 1),
  start_verse INT NOT NULL CHECK(start_verse >= 1),
  end_book_id INT NOT NULL CHECK(end_book_id >= 1 AND end_book_id <= 66),
  end_chapter INT NOT NULL CHECK(end_chapter >= 1),
  end_verse INT NOT NULL CHECK(end_verse >= 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX verses_summary_user_id_idx ON verses_summary(user_id);

CREATE TRIGGER verses_summary_updated_at BEFORE UPDATE
  ON verses_summary
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;

------------------------
-- Chapter of the Day --
------------------------
-- This will hold the chapters for x day
CREATE TABLE chapter_of_the_day (
  chapter_date DATE NOT NULL PRIMARY KEY,
  book_id INT NOT NULL,
  chapter INT NOT NULL CHECK(chapter >= 1)
)
