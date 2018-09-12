const { logger } = require('../config/logger');

module.exports = (req, res, next) => {
  logger.info(`method: ${req.method}, || url: ${req.url} || time: ${new Date()}`);
  return next();
};
