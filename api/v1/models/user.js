const Sequelize = require('sequelize');

const { db } = require('../../../config/db');
const { ContactUs } = require('./contactUs');

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  mobile: {
    type: Sequelize.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  verified: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: '0',
  },
  verification: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },

},
{
  classMethods: {
    associate() {
      User.hasMany(ContactUs);
    },
  },
});


module.exports = {
  User,
};
