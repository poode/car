module.exports = (sequelize, DataTypes) => sequelize.define('workingTime', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  EndTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'workingTime',
});
