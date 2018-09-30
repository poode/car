/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => sequelize.define('LTCarTypes', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  carType: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: 'BINARY(1)',
    allowNull: true,
  },
  updatedAt: {
    type: 'BINARY(1)',
    allowNull: true,
  },
}, {
  tableName: 'LTCarTypes',
});
