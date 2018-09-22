const bcrypt = require('bcrypt');
const _ = require('lodash');
const randomString = require('randomstring');

const { pagination } = require('../util/PaginationUtil/pagination');
const { findOrCreate } = require('../util/helpers/ormFunctions');


/**
 * @param {*} password and plain string
 * @returns {*} hashed password
 */
async function bcryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}


/**
 * @param {*} userModel is ORM object
 * @param {*} mobile is number and it is unique
 * @returns {*} user object
 */
async function getUserByMobile(userModel, mobile) {
  const user = await userModel.findOne({
    where: { mobile },
    attributes: ['id', 'username', 'mobile', 'email', 'verified', 'createdAt', 'updatedAt'],
  });
  return user;
}

/**
 * @param {*} userModel is ORM object
 * @returns Array of Users
 */
async function returnAllUsers(userModel) {
  const users = await userModel.findAll();
  const usersFound = _.map(users, user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    mobile: user.mobile,
    verified: user.verified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
  return usersFound;
}

/**
 *
 * @param {*} model is ORM Object
 * @param {*} req is the request Object
 * @returns results object with error or user.
 */
async function findUserByIdOrMobile(model, req) {
  const results = {
    error: '',
    user: '',
  };
  const whereObject = {};
  if (req.path.includes('id')) {
    whereObject.id = req.params.id;
  }
  if (req.path.includes('mobile')) {
    whereObject.mobile = req.params.mobile;
  }
  const user = await model.findOne({
    where: whereObject,
    attributes: ['id', 'username', 'email', 'mobile', 'verified', 'createdAt', 'updatedAt'],
  });
  if (!user) results.error = { message: 'no user found with given id', status: 404 };
  results.user = user;
  return results;
}

/**
 *
 * @param {*} model is ORM Object
 * @param {*} req is the request Object.
 * @returns paginated object with found users.
 */
async function limitedUsers(model, req) {
  const { error, paginated } = await pagination(model, req);
  if (error.message) return { message: error.message, status: error.status };
  const picked = {
    list: paginated.result.map(user => _.pick(user, ['id', 'username', 'email', 'verified', 'mobile', 'createdAt', 'updatedAt'])),
    count: paginated.count,
    pages: paginated.pages,
  };
  return picked;
}

async function RegisterUser(model, req) {
  const results = {
    error: '',
    user: '',
  };

  // hashing password before saving to database.
  const hashedPassword = await bcryptPassword(req.body.password);
  // generate verificationKey
  let verificationKey = randomString.generate({
    length: 6,
    charset: 'numeric',
  });
  if (verificationKey.length !== 6) {
    verificationKey = randomString.generate({
      length: 6,
      charset: 'numeric',
    });
  }
  // find user by mobile if not found create it.
  const options = {
    where: { mobile: req.body.mobile },
    defaults: {
      username: req.body.username,
      password: hashedPassword,
      mobile: req.body.mobile,
      verification: verificationKey,
    },
  };

  const { modelInstance, modelExists } = await findOrCreate(model, options);
  if (modelExists === false) {
    results.error = { message: 'mobile number already exists, forgot your password?', status: 409 };
    return results;
  }
  results.user = await getUserByMobile(model, modelInstance.mobile);
  return results;
}

async function findUserByIdOrMobileAndDelete(model, req) {
  const results = {
    error: '',
    user: '',
  };
  const whereObject = {};
  if (req.path.includes('id')) {
    whereObject.id = req.params.id;
  }
  if (req.path.includes('mobile')) {
    whereObject.mobile = req.params.mobile;
  }
  const user = await model.destroy({
    where: whereObject,
  });
  if (!user) results.error = { message: 'no user found with given ID', status: 404 };
  results.user = user;
  return results;
}

async function verifyUser(model, req) {
  const result = {
    user: '',
    error: '',
  };
  const user = await model.find({
    where: { mobile: req.body.mobile },
  });
  if (!user) {
    result.error = { message: `Mobile number ${req.body.mobile} is not exists on database`, status: 404 };
    return result;
  }
  if (!user.verification) {
    result.error = { message: `Mobile number ${req.body.mobile} is already verified`, status: 400 };
    return result;
  }
  if (Number(req.body.verification) !== user.verification) {
    result.error = { message: 'invalid verification number', status: 400 };
    return result;
  }
  await model.update({ verified: true, verification: 0 }, { where: { mobile: user.mobile } });
  const updatedUser = await model.find({
    where: { mobile: req.body.mobile },
  });
  result.user = _.pick(updatedUser, ['id', 'username', 'mobile', 'verified']);
  return result;
}

module.exports = {
  bcryptPassword,
  getUserByMobile,
  returnAllUsers,
  findUserByIdOrMobile,
  limitedUsers,
  RegisterUser,
  findUserByIdOrMobileAndDelete,
  verifyUser,
};
