module.exports = (sequelize, DataTypes) => sequelize.define('contactUs', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  contactUsReasonTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'contactUsReason',
      key: 'id',
    },
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageOrVideoPath: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
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
  tableName: 'contactUs',
});
