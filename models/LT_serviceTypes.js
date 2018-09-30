/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => sequelize.define('LTServiceTypes', {
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
    type: DataTypes.DATE,
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
