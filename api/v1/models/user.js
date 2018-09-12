const db = require('../../../config/db');

const userSchema = {
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  mobile: {
    type: Number,
    required: true,
    minlength: 12,
    maxlength: 12,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
};


module.exports = {
  userSchema,
};
