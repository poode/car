const Sequelize = require('sequelize');

const { logger } = require('./logger');

const sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    operatorsAliases: false,

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

sequelize.authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error(`Unable to connect to the database:${JSON.stringify(err)}`);
  });


module.exports = {
  db: sequelize,
};
