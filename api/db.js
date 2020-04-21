/**
 * Load configuration object in project root
 */
const knexfile = require('../knexfile');

/**
 * Initialize database connection with config option and export for other modules
 */
module.exports = require('knex')(knexfile);
