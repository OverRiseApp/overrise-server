
exports.up = function(knex) {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION chapter_of_the_day_esv(c chapter_of_the_day)
    RETURNS SETOF esv as $$  
      SELECT * FROM esv WHERE book_id = c.book_id AND chapter = c.chapter
    $$ language sql stable;

    GRANT EXECUTE ON FUNCTION chapter_of_the_day_esv TO standard_user;
  `)
};

exports.down = function(knex) {
  return knex.raw(`
    DROP FUNCTION chapter_of_the_day_esv(chapter_of_the_day);
  `)
};
