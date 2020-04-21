const express = require('express');

/**
 * Attach all route modules into single router
 */
const api = express.Router();
api.use('/characters', require('./characters'));

/**
 * Prepend all API routes
 */
const router = express.Router();
router.use('/api', api);

module.exports = router;
