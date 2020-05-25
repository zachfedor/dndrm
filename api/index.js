/**
 * D&DRM API
 */

// Load environment variables from .env file
require('dotenv').config();


const express = require('express');
const app = express();
const db = require('./db');
const http = require('http').createServer(app);
const humps = require('humps');
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
    switch (action.type) {
      case 'updateCharacter':
        const fields = humps.decamelizeKeys(action.character);
        Object.keys(fields).forEach(key => {
          if (Array.isArray(fields[key])) {
            fields[key] = JSON.stringify(fields[key]);
          }
        });

        db('characters')
          .where({ id: action.id })
          .update(fields)
          .then(() => {
            // On receiving an action from a client, update all other clients with the same action
            io.emit('dispatch', { ...action, fromServer: true });
          });
      default:
        console.log('action: ', action);
    }
  });
});

http.listen(config.port, () => {
  console.log(`Express app listening at http://localhost:${config.port}`);
});

