const passport = require('passport');
const { generateToken } = require('../auth');


const login = (req, res, next) => {
  if (!req.body.username) {
    return res.status(422).json({error: "Username is required"});
  }
  if (!req.body.password) {
    return res.status(422).json({error: "Password is required"});
  }

  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) return next(err);

    if (user) {
      return res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          token: generateToken(user),
        },
      });
    } else {
      // Username or password is invalid
      return res.status(422).json(info);
    }
  })(req, res, next);
};


module.exports = {
  login,
};
