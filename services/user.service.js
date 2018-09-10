const Joi = require('joi');
const bcrypt = require('bcrypt');

const { User } = require('../api/v1/models/user');

const JoiUserSchema = {
  name: Joi.string().min(5).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(255).required(),
};

function validateUser(user) {
  return Joi.validate(user, JoiUserSchema);
}

async function bcryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function getUser(email) {
  const user = await User.findOne({ email });
  return user;
}

module.exports = {
  JoiUserSchema,
  validateUser,
  bcryptPassword,
  getUser,
};
