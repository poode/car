const userSchema = {
  type: 'object',
  required: ['username', 'mobile', 'password'],
  properties: {
    username: {
      type: 'string',
      minlength: 5,
      maxlength: 255,
    },
    mobile: {
      type: 'number',
      minlength: 12,
      maxlength: 12,
      unique: true,
    },
    email: {
      type: 'string',
      maxlength: 255,
    },
    password: {
      type: 'string',
      minlength: 8,
      maxlength: 255,
    },
    userType_id: {
      type: 'integer',
      maxlength: 255,
    },
  },
};

const jsonUserSchema = JSON.stringify(userSchema);

function db(res) {
  return res.locals.dbConn;
}

module.exports = {
  jsonUserSchema,
  db,
};
