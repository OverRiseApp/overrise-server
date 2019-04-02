\c overrise  

Create Or Replace Function viewer() Returns "user" As $$
  select *
  from "user"
  where id = current_setting('jwt.claims.user_id')::integer
$$ language sql stable security definer;

GRANT EXECUTE ON FUNCTION viewer TO standard_user;

CREATE OR REPLACE FUNCTION get_chapter_of_the_day() RETURNS chapter_of_the_day AS $$
  SELECT * FROM chapter_of_the_day WHERE chapter_date = (CURRENT_TIMESTAMP AT TIME ZONE 'Europe/London')::DATE;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION get_chapter_of_the_day TO standard_user;