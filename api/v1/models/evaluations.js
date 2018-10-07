module.exports = (sequelize, DataTypes) => sequelize.define('evaluations', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id',
    },
  },
  stars: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: '1',
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
  tableName: 'evaluations',
});
