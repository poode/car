/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => sequelize.define('rolePermissions', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  roleType_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'LT_roleTypes',
      key: 'id',
    },
  },
  permission_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'LT_permissionTypes',
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
  tableName: 'rolePermissions',
});
