exports.up = function(knex, Promise) {
	return knex.raw(
		`
      ALTER TABLE "book_summary" ENABLE ROW LEVEL SECURITY;
      ALTER TABLE "chapter_summary" ENABLE ROW LEVEL SECURITY;
      ALTER TABLE "verses_summary" ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS all_book_summary on book_summary;
      DROP POLICY IF EXISTS insert_chapter_summary on chapter_summary;
      DROP POLICY IF EXISTS update_chapter_summary on chapter_summary;
      DROP POLICY IF EXISTS delete_chapter_summary on chapter_summary;
      DROP POLICY IF EXISTS all_verses_summary on verses_summary;

      CREATE POLICY all_book_summary on book_summary for SELECT USING (user_id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
      CREATE POLICY insert_chapter_summary ON chapter_summary FOR INSERT TO standard_user
        WITH CHECK (user_id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
      CREATE POLICY update_chapter_summary ON chapter_summary FOR UPDATE TO standard_user
        USING (user_id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
      CREATE POLICY delete_chapter_summary ON chapter_summary FOR DELETE TO standard_user
        USING (user_id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
      CREATE POLICY all_verses_summary on verses_summary for SELECT USING (user_id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
    `,
	)
}

exports.down = function(knex, Promise) {
	return knex.raw(
		`
      ALTER TABLE "book_summary" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "chapter_summary" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "verses_summary" DISABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS all_book_summary on book_summary;
      DROP POLICY IF EXISTS insert_chapter_summary on chapter_summary;
      DROP POLICY IF EXISTS update_chapter_summary on chapter_summary;
      DROP POLICY IF EXISTS delete_chapter_summary on chapter_summary;
      DROP POLICY IF EXISTS all_verses_summary on verses_summary;

      CREATE POLICY all_book_summary on book_summary for SELECT USING (id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
      CREATE POLICY insert_chapter_summary ON chapter_summary FOR INSERT TO standard_user
        WITH CHECK (id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
      CREATE POLICY update_chapter_summary ON chapter_summary FOR UPDATE TO standard_user
        USING (id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
      CREATE POLICY delete_chapter_summary ON chapter_summary FOR DELETE TO standard_user
        USING (id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
      CREATE POLICY all_verses_summary on verses_summary for SELECT USING (id = NULLIF(current_setting('jwt.claims.user_id', true), '')::integer);
    `,
	)
}
