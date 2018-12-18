\c overrise  

Create Or Replace Function viewer() Returns "user" As $$
  select *
  from "user"
  where id = current_setting('jwt.claims.user_id')::integer
$$ language sql stable security definer;

GRANT EXECUTE ON FUNCTION viewer TO standard_user;
