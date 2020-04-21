// Update with your config settings.
require('dotenv').config();

console.log('Running knexfile...');
console.log(`Node environment: ${process.env.NODE_ENV}`);
console.log(`Database connection: ${process.env.DATABASE_URL}`);

module.exports = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  debug: process.env.NODE_ENV === 'development',
  migrations: {
    directory: 'api/migrations',
    tableName: 'migrations',
  },
  seeds: {
    directory: 'api/seeds',
  }
};
