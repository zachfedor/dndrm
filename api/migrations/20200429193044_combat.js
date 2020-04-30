
exports.up = function(knex) {
  return knex.schema.table('characters', table => {
    table.text('conditions');
    table.integer('initiative');
    table.jsonb('spell_slots');
    table.text('spell_notes');
    table.text('feature_notes');
    table.jsonb('coin');
    table.text('equipment_notes');
    table.integer('armor_class');
    table.string('speed');
    table.integer('experience');
    table.boolean('inspiration');
    table.text('background_notes');
  }).raw('ALTER TABLE characters ALTER COLUMN weapon_notes SET DATA TYPE text');
};

exports.down = function(knex) {
  return knex.schema.table('characters', table => {
    table.dropColumns(
      'conditions',
      'initiative',
      'spell_slots',
      'spell_notes',
      'feature_notes',
      'coin',
      'equipment_notes',
      'armor_class',
      'speed',
      'experience',
      'inspiration',
      'background_notes'
    );
  }).raw('ALTER TABLE characters ALTER COLUMN weapon_notes SET DATA TYPE varchar(255)');
};
