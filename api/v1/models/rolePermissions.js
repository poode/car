module.exports = (sequelize, DataTypes) => sequelize.define('rolePermissions', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  roleTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'LTRoleTypes',
      key: 'id',
    },
  },
  permissionId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'LTPermissionTypes',
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
