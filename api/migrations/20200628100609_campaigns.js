
exports.up = function(knex) {
  return knex.schema.createTable('campaigns', (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
  }).alterTable('characters', (table) => {
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('campaign_id').unsigned();
    table.foreign('campaign_id').references('campaigns.id').onDelete('CASCADE').onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('characters', (table) => {
    table.dropColumn('user_id', 'campaign_id');
  }).dropTableIfExists('campaigns');
};
