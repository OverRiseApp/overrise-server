\c overrise

INSERT INTO "user" ("first_name", "last_name", "email_address", "created_at")
VALUES ('Test', 'User', 'test@test.test', 'now()');
INSERT INTO private."user" ("hashed_password")
VALUES ('$2a$10$Bn1JHu7.FmVGp8NrieISB.y44V2W6Gp8w9FqKzi11Nuz6ci5GxHYq');
-- password: test123