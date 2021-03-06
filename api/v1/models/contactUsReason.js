module.exports = (sequelize, DataTypes) => sequelize.define('contactUsReason', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  reasonType: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'LTContactUsReasonTypes',
});
