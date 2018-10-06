const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const randomString = require('randomatic');

const { validate, validateSchemaAndMobile } = require('../util/helpers/validation');
const LoginSchema = require('../api/v1/schema/login.json');
const smsVerificationSchema = require('../api/v1/schema/smsVerificationSchema.json');
const { user } = require('../config/db').db;
const { sms } = require('../util/sms/sendSMS');

/**
 *
 * @param {*} signOption the option needed to create the token
 * like user data and his roles for example
 */
async function tokenGenerator(signOption) {
  const token = await jwt.sign(signOption, process.env.APP_SECRET, { expiresIn: '30d' });
  return token;
}

/**
 *
 * @param {*} reqBody the request body to authenticate the user
 */
async function signIn(reqBody) {
  const results = {
    error: '',
    user: '',
    token: '',
  };
  const errors = validate(LoginSchema, reqBody);
  if (errors.length) {
    results.error = { message: errors, status: 400 };
    return results;
  }

  const userFound = await user.findOne({
    where: { mobile: reqBody.mobile },
    attributes: ['id', 'username', 'password', 'mobile', 'email', 'verified', 'createdAt', 'updatedAt'],
  });
  if (!userFound) {
    const err = { message: 'this mobile is not found in our databases', status: 404 };
    results.error = err;
    return results;
  }

  const match = await bcrypt.compare(reqBody.password, userFound.password);
  if (!match) {
    const err = { message: 'the entered mobile or password is invalid!', status: 422 };
    results.error = err;
    return results;
  }
  const signOptions = _.pick(userFound, ['id', 'username', 'mobile', 'verified']);
  const token = await tokenGenerator(signOptions);
  results.token = token;
  results.user = signOptions;
  return results;
}

async function forgotAndSet(req) {
  const result = {
    errorMessage: '',
    successSent: '',
  };

  const { errorFound } = await validateSchemaAndMobile(smsVerificationSchema, req);
  if (errorFound) {
    result.errorMessage = errorFound;
    return result;
  }

  const userExist = await user.findOne({
    where: {
      mobile: req.body.mobile,
    },
  });

  if (!userExist) {
    result.errorMessage = { message: `The mobile number ${req.body.mobile} does not exist in our databases`, status: 400 };
    return result;
  }

  const { mobile } = req.body;
  const verificationKey = randomString('0', 6);
  await user.update({
    verification: verificationKey,
    resetPassword: true,
  }, { where: { mobile } });
  const message = `(reset password) The verification code is: [${verificationKey}] for mobile [${mobile}]
  this message generated automatically using Slack APIs as a mock sms`;
  const { sent, error } = await sms(message);
  if (error) {
    result.errorMessage = error;
    return result;
  }
  result.successSent = sent;
  return result;
}

module.exports = {
  signIn,
  forgotAndSet,
};
