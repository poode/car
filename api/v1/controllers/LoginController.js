const { authentication } = require('../../../services/login.service');

async function index(req, res, next) {
  const { token, error, user } = await authentication(req.body);
  if (error) return next({ message: error, status: 422 });
  return res.header('x-auth-token', token).send({
    authenticated: true,
    user,
    token,
  });
}

module.exports = {
  index,
};
