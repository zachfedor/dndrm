const router = require('express').Router();
const humps = require('humps');
const db = require('../db');
const { arrayToMapBy } = require('../utils');


router.get('/', (req, res, next) => {
  const { username } = req.query;
  const query = db.select().from('characters');

  if (username) {
    query.where('username', username);
  }

  query.then(results => {
    console.log('character results', results.length);
    const characters = humps.camelizeKeys(results)
      .reduce(arrayToMapBy('id'), {});

    res.json({ characters });
  }).catch(next);
});

module.exports = router;
