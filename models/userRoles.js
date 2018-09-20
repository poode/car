/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => sequelize.define('userRoles', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  roleType_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'LT_roleTypes',
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
  tableName: 'userRoles',
});
