const Sequelize = require('sequelize');

const { db } = require('../../../config/db');

function userModel(sequelize, dataType) {
  return sequelize.define('users', {
    id: {
      type: dataType.INTEGER,
    },
    username: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      notEmpty: true,
      allowNull: true,
      trim: true,
      type: dataType.STRING,
    },
    mobile: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: dataType.STRING,
      trim: true,
      allowNull: false,
    },
    verified: {
      type: dataType.BOOLEAN,
      trim: true,
    },

  });
}

const User = userModel(db, Sequelize);

module.exports = {
  User,
};
