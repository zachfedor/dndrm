
exports.up = function(knex) {
  return knex.schema.table('characters', table => {
    table.jsonb('weapons');
    table.string('weapon_notes');
  }); 
};

exports.down = function(knex) {
  return knex.schema.table('characters', table => {
    table.dropColumns('weapons', 'weapon_notes');
  });
};
