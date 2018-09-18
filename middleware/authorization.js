const jwt = require('jsonwebtoken');

async function isAuthorized(req, res, next) {
  const token = req.get('x-auth-token');
  if (!token) {
    next({ message: 'I don\'t know you, who are you?!', status: 401 });
    return false;
  }
  jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
    if (err) {
      return next(err);
    }
    const {
      id, mobile, iat, exp, verified, username,
    } = decoded;
    if (!mobile) {
      next({ message: 'invalid token', status: 400 });
      return false;
    }
    res.header('x-auth-token-creation', iat);
    res.header('x-auth-token-expiry', exp);
    res.locals.userId = id;
    res.locals.userMobile = mobile;
    res.locals.verified = verified;
    res.locals.username = username;
    next();
    return false;
  });
  return false;
}

module.exports = {
  isAuthorized,
};
