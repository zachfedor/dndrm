const humps = require('humps');
const db = require('../db');
const { arrayToMapBy } = require('../utils');


const getAllCharacters = async (req, res, next) => {
  const { user } = req.query;
  const query = db.select().from('characters');

  if (user) {
    query.where('user_id', user);
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


const getCharacter = async (req, res, next) => {
  const query = db('characters').where({ id: req.params.id }).first();

  const character = humps.camelizeKeys(await query);

  res.json({ character });
};


module.exports = {
  getAllCharacters,
  getCharactersByCampaign,
  getCharacter,
};
