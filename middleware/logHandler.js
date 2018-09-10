const { logger } = require('../config/logger');
const loggerControl = require('../util/LoggersControl/loggerControl')();

module.exports = (req, res, next) => {
  if (!loggerControl) {
    return next();
  }
  logger.info(`method: ${req.method}, || url: ${req.url} || time: ${new Date()}`);
  return next();
};
