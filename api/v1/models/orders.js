module.exports = (sequelize, DataTypes) => sequelize.define('orders', {
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
  carTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'carTypes',
      key: 'id',
    },
  },
  serviceTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'serviceTypes',
      key: 'id',
    },
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  arrivingTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  employeeId: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  endOrderReasonTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    references: {
      model: 'endOrderReasonTypes',
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
  tableName: 'orders',
});
