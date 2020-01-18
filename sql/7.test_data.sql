\c overrise

INSERT INTO "knex_migrations_lock" ("is_locked") VALUES (0);
INSERT INTO "knex_migrations" ("name", "batch", "migration_time") VALUES ('20181218083635_empty_initial_migration.js', 1, now());
INSERT INTO "knex_migrations" ("name", "batch", "migration_time") VALUES ('20190702131024_fix_rls.js', 1, now());
INSERT INTO "knex_migrations" ("name", "batch", "migration_time") VALUES ('20200118121007_esv_bible.js', 1, now());
INSERT INTO "knex_migrations" ("name", "batch", "migration_time") VALUES ('20200118172745_computed_esv_column.js', 1, now());

INSERT INTO "user" ("first_name", "last_name", "email_address", "created_at")
VALUES ('Test', 'User', 'test@test.test', 'now()');
INSERT INTO private."user" ("hashed_password")
VALUES ('$2a$10$Bn1JHu7.FmVGp8NrieISB.y44V2W6Gp8w9FqKzi11Nuz6ci5GxHYq');
-- password: test123