const express = require('express');
const asyncHandler = require('express-async-handler');
const { authRequired } = require('./auth');


/**
 * Attach all route modules into single router
 */
const api = express.Router();
const register = (method, url, controller) => {
  // convenience function to wrap routes with authentication
  // middleware and async error handling for each controller
  api[method](url, authRequired, asyncHandler(controller));
};


/**
 * Auth routes
 */
const { login } = require('./controllers/auth');
api.post('/auth/login', login);


/**
 * Campaign routes
 */
const {
  getAllCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  deleteCampaign,
} = require('./controllers/campaigns');
register('get', '/campaigns', getAllCampaigns);
register('post', '/campaigns', createCampaign);
register('get', '/campaigns/:id', getCampaign);
register('put', '/campaigns/:id', updateCampaign);
register('delete', '/campaigns/:id', deleteCampaign);


/**
 * Character routes
 */
const {
  getAllCharacters,
  getCharactersByCampaign,
  getCharacter,
} = require('./controllers/characters');
register('get', '/characters', getAllCharacters);
register('get', '/campaigns/:id/characters', getCharactersByCampaign);
register('get', '/characters/:id', getCharacter);


/**
 * User routes
 */
const { getCurrentUser } = require('./controllers/users');
register('get', '/users/current', getCurrentUser);


/**
 * Catch all other calls to API and return 404 error
 */
api.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = api;
