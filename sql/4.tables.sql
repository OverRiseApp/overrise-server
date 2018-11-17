\c bible  

create type jwt_token as (
  role text,
  user_id integer
);

CREATE TYPE user_type AS ENUM ('standard_user');

Create Table "user" (
  id serial primary key,
  first_name text not null DEFAULT '',
  last_name text not null DEFAULT '',
  email_address text not null DEFAULT '',
  user_type user_type not null DEFAULT 'standard_user',
  created_at timestamptz not null default now()
);
Create Table private."user" (
  id serial primary key REFERENCES public."user",
  hashed_password text not null
);
ALTER TABLE "user" enable row level security;

Create Table book_summary (
  id serial primary key,
  summary text not null DEFAULT '',
  user_id int not null REFERENCES public."user"(id),
  book_id int not null check(book_id >= 1 and book_id <= 66),
  created_at timestamptz not null default now(),
  UNIQUE (user_id, book_id)
);

Create Table verses_summary (
  id serial primary key,
  title text not null DEFAULT '',
  summary text not null DEFAULT '',
  user_id int not null REFERENCES public."user"(id),
  start_book_id int not null check(start_book_id >= 1 and start_book_id <= 66),
  start_chapter int not null check(start_chapter >= 1),
  start_verse int not null check(start_verse >= 1),
  end_book_id int not null check(end_book_id >= 1 and end_book_id <= 66),
  end_chapter int not null check(end_chapter >= 1),
  end_verse int not null check(end_verse >= 1),
  created_at timestamptz not null default now()
);