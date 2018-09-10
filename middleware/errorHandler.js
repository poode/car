const _ = require('lodash');
const { logger } = require('../config/logger');
const loggerControl = require('../util/LoggersControl/loggerControl')();


process.on('unhandledRejection', (err) => {
  throw err;
});

process.on('uncaughtException', (err) => {
  const error = { message: err.message, stack: err.stack };
  logger.error(error);
  process.exit();
});

/*eslint-disable */ // next is a part of middleware method signature I cannot ignore.
module.exports = (err, req, res, next) => {
  /*eslint-disable */ // I know that no way to attach property but I will use. 
  if (!err.status) err.status = 500;
  if (err.name === 'TokenExpiredError') {
    err.status = 403;
    err.message = `your session has been expired at ${err.expiredAt}`;
  }
  /* eslint-enable */
  if (!loggerControl) {
    return res.status(err.status).json({ error: 'error', status: err.status });
  }
  const error = {
    message: err.message,
    requestedUrl: req.url,
    requestedMethod: req.method,
    requestTime: `${new Date()}`,
    status: err.status,
    stack: err.stack,
  };
  /* eslint-enable */
  logger.error(error);
  return res.status(err.status).json({ error: _.pick(error, ['message', 'status']) });
};
