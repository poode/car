const mongoose = require('mongoose');
const { logger } = require('./logger');
const loggerControl = require('../util/LoggersControl/loggerControl')();


const URL = `${process.env.DB_TYPE}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

mongoose.connect(URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', () => {
  if (loggerControl) {
    logger.info('Unable to connect to Database...');
  }
});

db.on('open', () => {
  if (loggerControl) {
    logger.info('Connected to Database...');
  }
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = {
  mongoose,
};
