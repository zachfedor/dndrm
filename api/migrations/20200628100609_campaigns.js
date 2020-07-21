
exports.up = function(knex) {
  return knex.schema.createTable('campaigns', (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('user_id').unsigned().notNullable();
    // if user is deleted/updated, delete/update their campaign
    table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
  }).alterTable('characters', (table) => {
    table.integer('user_id').unsigned();
    // if user is deleted/updated, delete/update their character
    table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('campaign_id').unsigned();
    // if campaign is deleted, set the campaign_id to null value
    // if campaign is updated, update the character to match
    table.foreign('campaign_id').references('campaigns.id').onDelete('SET NULL').onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('characters', (table) => {
    table.dropColumn('user_id', 'campaign_id');
  }).dropTableIfExists('campaigns');
};
