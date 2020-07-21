// Truncate all tables in proper order before seeding them

exports.seed = function(knex) {
  return Promise.all([
    knex.raw('TRUNCATE TABLE characters RESTART IDENTITY CASCADE'),
    knex.raw('TRUNCATE TABLE campaigns RESTART IDENTITY CASCADE'),
    knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE'),
  ]);
};
