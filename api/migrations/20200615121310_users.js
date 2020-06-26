
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments().primary();
    table.string('email').unique().notNullable();
    table.string('username').unique().notNullable();
    table.string('password', 1024).notNullable();
    table.string('salt').notNullable();
  }); 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
