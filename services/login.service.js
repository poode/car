const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const { validate } = require('../util/helpers/validation');
const LoginSchema = require('../api/v1/schema/login.json');
const { User } = require('../api/v1/models/user');


async function tokenGenerator(signOption) {
  const token = await jwt.sign(signOption, process.env.APP_SECRET, { expiresIn: '36h' });
  return token;
}

async function authentication(reqBody) {
  const results = {
    error: '',
    user: '',
    token: '',
  };
  const error = validate(LoginSchema, reqBody);
  if (error) {
    results.error = error;
    return results;
  }

  const user = await User.findOne({
    where: { mobile: reqBody.mobile },
    attributes: ['id', 'username', 'password', 'mobile', 'email', 'verified', 'createdAt', 'updatedAt'],
  });
  if (!user) {
    const err = { message: 'this mobile is not found in our databases', status: 404 };
    results.error = err;
    return results;
  }

  const match = await bcrypt.compare(reqBody.password, user.password);
  if (!match) {
    const err = { message: 'the entered mobile or password is invalid!', status: 500 };
    results.error = err;
    return results;
  }
  const signOptions = _.pick(user, ['id', 'username', 'mobile', 'email', 'verified', 'createdAt', 'updatedAt']);
  const token = await tokenGenerator(signOptions);
  results.token = token;
  results.user = signOptions;
  return results;
}

module.exports = {
  authentication,
};
