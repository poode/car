module.exports = (sequelize, DataTypes) => sequelize.define('userRoles', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  roleTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'roleTypes',
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
