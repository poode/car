module.exports = (sequelize, DataTypes) => {
  const LT_roleTypes = sequelize.define('LT_roleTypes', {
    roleType: DataTypes.STRING,
  }, {});
  LT_roleTypes.associate = function (models) {
    // associations can be defined here
  };
  return LT_roleTypes;
};
