const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const humps = require('humps');
const { authRequired } = require('../controllers/auth');
const db = require('../db');
const { arrayToMapBy } = require('../utils');


router.get('/', authRequired, asyncHandler(async (req, res) => {
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
}));


router.post('/', authRequired, asyncHandler(async (req, res) => {
  const result = await db('campaigns')
    .returning(['id', 'name', 'user_id', 'created_at'])
    .insert({
      name: req.body.name,
      'user_id': req.user.id,
    });

  const campaign = humps.camelizeKeys(result[0]);
  res.json({ campaign });
}));


router.get('/:id', authRequired, asyncHandler(async (req, res, next) => {
  const query = db('campaigns').where({ id: req.params.id }).first();

  const campaign = humps.camelizeKeys(await query);

  res.json({ campaign });
}));

router.delete('/:id', authRequired, asyncHandler(async (req, res, next) => {
  await db('campaigns').where({ id: req.params.id }).del();

  res.json({});
}));

router.put('/:id', authRequired, asyncHandler(async (req, res, next) => {
  const result = await db('campaigns')
    .returning(['id', 'name', 'user_id', 'created_at'])
    .where({ id: req.params.id })
    .update(humps.decamelizeKeys(req.body));

  const campaign = humps.camelizeKeys(result[0]);
  res.json({ campaign });
}));

router.get('/:id/characters', authRequired, asyncHandler(async (req, res, next) => {
  const query = db('characters').where({ 'campaign_id': req.params.id });

  const characters = humps.camelizeKeys(await query)
    .reduce(arrayToMapBy('id'), {});

  res.json({ characters });
}));

module.exports = router;
