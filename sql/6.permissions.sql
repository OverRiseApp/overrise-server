\c overrise 

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO standard_user;

-- Look at your own profile
GRANT SELECT(id, first_name, last_name, email_address, created_at) ON "user" TO standard_user;
CREATE POLICY select_user on "user" for SELECT using(id = current_setting('jwt.claims.user_id')::integer);

-- Update general data
GRANT UPDATE(first_name, last_name) ON "user" TO standard_user;
CREATE POLICY update_user on "user" for UPDATE using(id = current_setting('jwt.claims.user_id')::integer);

--------------------
-- Book Summaries --
--------------------
GRANT SELECT, INSERT, UPDATE, DELETE on book_summary TO standard_user;
CREATE POLICY all_book_summary on book_summary for SELECT using(id = current_setting('jwt.claims.user_id')::integer);

----------------------
-- Verses Summaries --
----------------------
GRANT SELECT, INSERT, UPDATE, DELETE on verses_summary TO standard_user;
CREATE POLICY all_verses_summary on verses_summary for SELECT using(id = current_setting('jwt.claims.user_id')::integer);
