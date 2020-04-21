
exports.up = function(knex) {
  return knex.schema.createTable('characters', table => {
    table.increments();
    table.string('name');
    table.string('race');
    table.string('class');
    table.integer('level');
    table.string('background');
    table.string('alignment');
    table.jsonb('abilities');
    table.jsonb('saving_throws');
    table.jsonb('hp');
    table.jsonb('proficiencies');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('characters');
};
