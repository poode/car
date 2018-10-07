module.exports = (sequelize, DataTypes) => sequelize.define('employeeAttendance', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  employeeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  attendanceTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  LeavingTime: {
    type: DataTypes.DATE,
    allowNull: false,
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
  tableName: 'employeeAttendance',
});
