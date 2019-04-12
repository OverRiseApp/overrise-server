\c overrise

CREATE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  new.updated_at := current_timestamp;
  RETURN new;
END;
$$ LANGUAGE PLPGSQL;