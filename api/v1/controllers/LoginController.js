const { signIn, forgotAndSet } = require('../../../services/login.service');

async function index(req, res, next) {
  const { token, error, user } = await signIn(req.body, res);
  if (error) return next(error);
  return res.header('x-auth-token', token).send({
    authenticated: true,
    user,
    token,
  });
}

async function forgotPassword(req, res, next) {
  const { successSent, errorMessage } = await forgotAndSet(req);
  if (errorMessage) return next(errorMessage);
  return res.json({ mobile: `${req.body.mobile}`, smsId: `${successSent}` });
}

async function resetPassword(req, res, next) {
  const { mobile, verification } = req.body;
  
}

module.exports = {
  index,
  forgotPassword,
  resetPassword,
};
