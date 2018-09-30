const Sequelize = require('sequelize');

const { db } = require('../../../config/db');
const { User } = require('../models/user');

const ContactUs = db.define('contactUs', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  contactUsReasonTypeId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'LTContactUsReasonTypes',
      key: 'id',
    },
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageOrVideo: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  userId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
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
  underscored: false,
},
{
  tableName: 'contactUs',
  classMethods: {
    associate() {
      ContactUs.belongsTo(User);
    },
  },
});


module.exports = {
  ContactUs,
};
