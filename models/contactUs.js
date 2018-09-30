module.exports = (sequelize, DataTypes) => sequelize.define('contactUs', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  contactUsReasonType_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'LTContactUsReasonTypes',
      key: 'id',
    },
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageOrVideo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  user_id: {
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
