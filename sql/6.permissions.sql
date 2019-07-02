\c overrise 

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO standard_user;
----------
-- User --
----------
-- Everyone can look at anything for now
GRANT SELECT(id, first_name, last_name, email_address, created_at) ON "user" TO anonymous, standard_user;
CREATE POLICY select_user on "user" for SELECT USING (TRUE);
-- CREATE POLICY select_user on "user" for SELECT USING (id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);

-- Update general data
GRANT UPDATE(first_name, last_name) ON "user" TO standard_user;
CREATE POLICY update_user on "user" for UPDATE USING (id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);

--------------------
-- Book Summaries --
--------------------
-- TODO: Double check this. Currently not used after the rework.
GRANT SELECT, INSERT, UPDATE, DELETE on book_summary TO standard_user;
CREATE POLICY all_book_summary on book_summary for SELECT USING (user_id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);

-----------------------
-- Chapter Summaries --
-----------------------
-- Not logged in, can only read people's 
GRANT SELECT on chapter_summary TO anonymous;
-- TODO: Private chapter summaries
CREATE POLICY anon_select_chapter_summary ON chapter_summary FOR SELECT
  USING (TRUE);

-- Logged in
-- You can do anything to your own. Select only for other people, same as anon.
GRANT SELECT, INSERT, UPDATE, DELETE ON chapter_summary TO standard_user;
CREATE POLICY select_chapter_summary ON chapter_summary FOR SELECT TO standard_user
  USING (TRUE);
-- Other actions
CREATE POLICY insert_chapter_summary ON chapter_summary FOR INSERT TO standard_user
  WITH CHECK (user_id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
CREATE POLICY update_chapter_summary ON chapter_summary FOR UPDATE TO standard_user
  USING (user_id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
CREATE POLICY delete_chapter_summary ON chapter_summary FOR DELETE TO standard_user
  USING (user_id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);

----------------------
-- Verses Summaries --
----------------------
-- TODO: Double check this. Currently not used after the rework.
GRANT SELECT, INSERT, UPDATE, DELETE on verses_summary TO standard_user;
CREATE POLICY all_verses_summary on verses_summary for SELECT USING (user_id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);

------------------------
-- Chapter of the Day --
------------------------
-- Everyone should be able to read this
GRANT SELECT on chapter_of_the_day TO anonymous, standard_user;