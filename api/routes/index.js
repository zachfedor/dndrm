const express = require('express');

/**
 * Attach all route modules into single router
 */
const api = express.Router();
api.use('/auth', require('./auth'));
api.use('/campaigns', require('./campaigns'));
api.use('/characters', require('./characters'));
api.use('/users', require('./users'));

/**
 * Catch 404 error calls to API
 */
api.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = api;
