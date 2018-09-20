/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => sequelize.define('orders', {
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
  carType_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'LT_carTypes',
      key: 'id',
    },
  },
  serviceType_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'LT_serviceTypes',
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
  },
  arrivingTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  employee_id: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  endOrderReasonType_id: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    references: {
      model: 'LT_endOrderReasonTypes',
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
