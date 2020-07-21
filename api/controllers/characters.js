const humps = require('humps');
const db = require('../db');
const { arrayToMapBy } = require('../utils');


const getAllCharacters = async (req, res, next) => {
  const { username } = req.query;
  const query = db.select().from('characters');

  if (username) {
    query.where('username', username);
  }

  const results = await query;
  const characters = humps.camelizeKeys(results)
    .reduce(arrayToMapBy('id'), {});

  res.json({ characters });
};


const getCharactersByCampaign = async (req, res, next) => {
  const query = db('characters').where({ 'campaign_id': req.params.id });

  const characters = humps.camelizeKeys(await query)
    .reduce(arrayToMapBy('id'), {});

  res.json({ characters });
};


module.exports = {
  getAllCharacters,
  getCharactersByCampaign,
};
