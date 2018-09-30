const { signIn } = require('../../../services/login.service');

async function index(req, res, next) {
  const { token, error, user } = await signIn(req.body, res);
  if (error) return next(error);
  return res.header('x-auth-token', token).send({
    authenticated: true,
    user,
    token,
  });
}

module.exports = {
  index,
};
