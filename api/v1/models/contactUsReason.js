const Sequelize = require('sequelize');

const { db } = require('../../../config/db');


const ContactUsReason = db.define('LTContactUsReasonTypes', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  reasonType: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
}, {
  tableName: 'LTContactUsReasonTypes',
});


module.exports = {
  ContactUsReason,
};
