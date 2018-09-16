const bcrypt = require('bcrypt');
const _ = require('lodash');

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

async function findUserByIdOrMobile(model, req) {
  if (req.path.includes('id')) {
    const user = await model.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'username', 'email', 'mobile', 'verified', 'createdAt', 'updatedAt'],
    });
    return user;
  }
  if (req.path.includes('mobile')) {
    const user = await model.findOne({
      where: { mobile: req.params.id },
      attributes: ['id', 'username', 'email', 'mobile', 'verified', 'createdAt', 'updatedAt'],
    });
    return user;
  }
  return false;
}


module.exports = {
  bcryptPassword,
  getUserByMobile,
  returnAllUsers,
  findUserByIdOrMobile,
};
