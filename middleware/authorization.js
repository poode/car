const jwt = require('jsonwebtoken');

// const { getUser } = require('../services/user.service');

async function isAuthorized(req, res, next) {
  const token = req.get('x-auth-token');
  if (!token) {
    next({ message: 'I don\'t know you, who are you?!', status: 403 });
    return false;
  }
  jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
    if (err) {
      next(err);
      return false;
    }
    const {
      id, email, iat, exp,
    } = decoded;
    if (!email) {
      next({ message: 'invalid token', status: 403 });
      return false;
    }
    res.header('x-auth-token-creation', iat);
    res.header('x-auth-token-expiry', exp);
    res.locals.userId = id;
    res.locals.userEmail = email;
    next();
    return false;
  });
  return false;
}

module.exports = {
  isAuthorized,
};
