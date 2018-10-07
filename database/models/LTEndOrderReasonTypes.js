/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LTEndOrderReasonTypes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    endOrderReason: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'LTEndOrderReasonTypes'
  });
};
