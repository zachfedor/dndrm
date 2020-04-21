/**
 * D&DRM API
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');

const config = {
  port: process.env.PORT || 3030,
  dburl: process.env.DATABASE_URL,
};

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));

// Register all API routes
app.use(require('./routes'));

// Serve the React client
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')));

app.listen(config.port, () => console.log(`Express app listening at http://localhost:${config.port}`));

