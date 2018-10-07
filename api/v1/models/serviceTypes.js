module.exports = (sequelize, DataTypes) => sequelize.define('serviceTypes', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  serviceType: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  servicePrice: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  estimatedTime: {
    type: DataTypes.TIME,
    allowNull: false,
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
  tableName: 'LTServiceTypes',
});
