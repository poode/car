/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LTPermissionTypes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    permissionType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
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
    tableName: 'LTPermissionTypes'
  });
};
