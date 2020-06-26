/**
 * D&DRM API
 */

// Load environment variables from .env file
require('dotenv').config();

// Import dependencies
const humps = require('humps');
const morgan = require('morgan')('dev');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const config = require('./config');
const db = require('./db');
const { verifyUser } = require('./controllers/auth');

const buildDir = path.join(__dirname, '..', 'build');


// Create Express app and HTTP server objects
const express = require('express');
const app = express();
const http = require('http').createServer(app);


// Configure local strategy for Passport
passport.use(new LocalStrategy((username, password, cb) => {
  db('users').where('username', username).first()
  .then((user) => {
    // if user does not exist or credentials don't match, don't error but return failure
    if (!user || !verifyUser(user, password)) {
      return cb(null, false, {error: 'Username or password is invalid'});
    }

    // otherwise, return the verified user object
    return cb(null, user);
  });
}));


// Register middleware
app.use(express.static(buildDir));
app.use(express.json());
app.use(morgan);
app.use(passport.initialize());

// Register API routes
app.use('/api', require('./routes'));

// Serve the React client
app.get('*', (req, res) => {
  /**
   * This is served at any requested URL. The React app will handle 404 errors via it's own
   * logic configured with react-router. API 404 errors are handled in routes/index.js and
   * will send error objects to the React app to consume and handle on it's own.
   */
  res.sendFile(path.join(buildDir, 'index.html'));
});


// Setup websocket connection using the HTTP server
const io = require('socket.io')(http);

// Configure websocket events
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
        break;
      default:
        console.log('action: ', action);
    }
  });
});


// Setup error handler
app.use((err, req, res, next) => {
  let error = {};
  if (process.env.NODE_ENV !== 'production') {
    // Pass errors to client in development and testing environments
    console.log(err.stack);
    error = err;
  }

  res.status(err.status || 500);
  res.json({ errors: {
    message: err.message,
    error,
  }});
});

http.listen(config.port, () => {
  console.log(`Express app listening at http://localhost:${config.port}`);
});

