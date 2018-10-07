const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const { logger } = require('./logger');

Sequelize.Promise = Promise;


const db = {};
const sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    operatorsAliases: false,
    // logging: logger.debug,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: false,
      freezeTableName: false,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
      timestamps: true,
    },
  },
);
const modelPath = `${__dirname.split('/config')[0]}/api/v1/models`;

fs
  .readdirSync(modelPath)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(modelPath, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.userRoles.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id', foreignKeyConstraint: true });
db.userRoles.belongsTo(db.roleTypes, { foreignKey: 'roleTypeId', targetKey: 'id', foreignKeyConstraint: true });
db.rolePermissions.belongsTo(db.roleTypes, { foreignKey: 'roleTypeId', targetKey: 'id', foreignKeyConstraint: true });
db.rolePermissions.belongsTo(db.permissionTypes, { foreignKey: 'permissionId', targetKey: 'id', foreignKeyConstraint: true });
db.employeeAttendance.belongsTo(db.user, { foreignKey: 'employeeId', targetKey: 'id', foreignKeyConstraint: true });
db.evaluations.belongsTo(db.orders, { foreignKey: 'orderId', targetKey: 'id', foreignKeyConstraint: true });
db.contactUs.belongsTo(db.user, { foreignKeyConstraint: true });
db.contactUs.belongsTo(db.contactUsReason, { foreignKey: 'contactUsReasonTypeId', targetKey: 'id', foreignKeyConstraint: true });
db.orders.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id', foreignKeyConstraint: true });
db.orders.belongsTo(db.carTypes, { foreignKey: 'carTypeId', targetKey: 'id', foreignKeyConstraint: true });
db.orders.belongsTo(db.serviceTypes, { foreignKey: 'serviceTypeId', targetKey: 'id', foreignKeyConstraint: true });
db.orders.belongsTo(db.endOrderReasonTypes, { foreignKey: 'endOrderReasonTypeId', targetKey: 'id', foreignKeyConstraint: true });


module.exports = {
  db,
};
