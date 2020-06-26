const crypto = require('crypto');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;


const generateSalt = () => crypto.randomBytes(16).toString('hex');

const generateHash = (password, salt) => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
};

const verifyUser = (user, password) => {
  if (!user || !user.password) return false;
  return user.password === generateHash(password, user.salt);
};

const generateToken = (user) => {
  const exp = new Date();
  exp.setDate(exp.getDate() + 30);

  return jwt.sign({
    id: user.id,
    username: user.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

const getToken = (req) => {
  const auth = req.headers.authorization;
  if (auth && ['Bearer', 'Token'].includes(auth.split(' ')[0])) {
    return auth.split(' ')[1];
  }
  return null;
};

const authRequired = expressJWT({ getToken, secret });

module.exports = {
  generateSalt,
  generateHash,
  verifyUser,
  generateToken,
  authRequired,
};
