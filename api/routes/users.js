const router = require('express').Router();
const db = require('../db');
const { authRequired } = require('../controllers/auth');

router.get('/current', authRequired, (req, res) => {
  db('users').where('id', req.user.id).first()
    .then(user => {
      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    });
});

module.exports = router;
