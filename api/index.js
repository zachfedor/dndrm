/**
 * D&DRM API
 */

// Load environment variables from .env file
require('dotenv').config();


const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// const bodyParser = require('body-parser');
const path = require('path');


const config = {
  port: process.env.PORT || 3030,
  dburl: process.env.DATABASE_URL,
};

const buildDir = path.join(__dirname, '..', 'build');


app.use(express.static(buildDir));

// Register all API routes
app.use(require('./routes'));

// Serve the React client
app.get('*', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('socket user connected');

  socket.on('dispatch', (action) => {
    // On receiving an action from a client, update all other clients with the same action
    io.emit('dispatch', { ...action, fromServer: true });
  });
});

http.listen(config.port, () => {
  console.log(`Express app listening at http://localhost:${config.port}`);
});

