const humps = require('humps');
const db = require('../db');
const { arrayToMapBy } = require('../utils');


const getAllCampaigns = async (req, res, next) => {
  const { embed, userID } = req.query;
  const query = db.select().from('campaigns');

  if (userID) {
    query.where('user_id', userID);
  }

  const campaigns = humps.camelizeKeys(await query)
    .reduce(arrayToMapBy('id'), {});
  const body = { campaigns };

  if (embed) {
    if (embed.includes('characters')) {
      const subquery = db('characters').whereIn('campaign_id', Object.keys(campaigns));
      body.characters = humps.camelizeKeys(await subquery)
        .reduce(arrayToMapBy('id'), {});
    }

    // TODO: embed campaign owners?
  }

  res.json(body);
};


const createCampaign = async (req, res, next) => {
  const [result] = await db('campaigns')
    .returning(['id', 'name', 'user_id', 'created_at'])
    .insert({
      name: req.body.name,
      'user_id': req.user.id,
    });

  const campaign = humps.camelizeKeys(result);
  res.json({ campaign });
};


const getCampaign = async (req, res, next) => {
  const query = db('campaigns').where({ id: req.params.id }).first();

  const campaign = humps.camelizeKeys(await query);

  res.json({ campaign });
};


const updateCampaign = async (req, res, next) => {
  const [result] = await db('campaigns')
    .returning(['id', 'name', 'user_id', 'created_at'])
    .where({ id: req.params.id })
    .update(humps.decamelizeKeys(req.body));

  const campaign = humps.camelizeKeys(result);
  res.json({ campaign });
};


const deleteCampaign = async (req, res, next) => {
  await db('campaigns').where({ id: req.params.id }).del();

  res.json({});
};


module.exports = {
  getAllCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  deleteCampaign,
};
