const router = require('express').Router();
const humps = require('humps');
const db = require('../db');

const reduceArrayByID = (obj, item) => {
  obj[item.id] = item;
  return obj;
};

router.get('/', (req, res) => {
  // get characters from db here
  db.select('*').from('characters')
    .then(results => {
      const characters = humps.camelizeKeys(results)
        .reduce(reduceArrayByID, {});

      res.json({ characters });
    })
    .catch(error => {
      console.error('DB_ERROR', error);
    });
});

module.exports = router;
