const db = require('../db');


const getCurrentUser = async (req, res, next) => {
  const user = await db('users').where('id', req.user.id).first();

  return res.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};


module.exports = {
  getCurrentUser,
};
