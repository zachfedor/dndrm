const prompt = require('prompt');

const auth = require('../api/auth');
const db = require('../api/db');


prompt.start();

prompt.get(['email', 'username', 'password'], (err, user) => {
  if (err) console.error(err);

  user.salt = auth.generateSalt();
  user.password = auth.generateHash(user.password, user.salt);

  db('users').returning(['id']).insert(user).then(results => {
    console.log(`Created User: ${results[0].id}`);
    process.exit();
  }).catch(err => {
    console.err(err);
    process.exit(1);
  });
});
