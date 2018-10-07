/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    carTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'LTCarTypes',
        key: 'id'
      }
    },
    serviceTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'LTServiceTypes',
        key: 'id'
      }
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    arrivingTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    employeeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    endOrderReasonTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'LTEndOrderReasonTypes',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'orders'
  });
};
