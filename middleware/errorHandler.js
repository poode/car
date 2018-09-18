const _ = require('lodash');
const { logger } = require('../config/logger');

process.on('unhandledRejection', (err) => {
  const error = {
    time: new Date(),
    type: 'unhandled promise',
    message: err.message,
    stack: err.stack,
  };
  throw error;
});

process.on('uncaughtException', (err) => {
  let error = {
    time: new Date(),
    type: 'expection',
    message: err.message,
    stack: err.stack,
  };
  if (err.type === 'unhandled promise') {
    error = {
      time: new Date(),
      type: err.type,
      message: err.message,
      stack: err.stack,
    };
  }
  logger.error(JSON.stringify(error));
  process.exit();
});

module.exports = (err, req, res, next) => {
  if (err.name === 'TokenExpiredError') {
    err.status = 403;
    err.message = `your session has been expired at ${err.expiredAt}`;
    err.stack = JSON.stringify(err);
  }
  const error = {
    message: err.message || err.name,
    stack: err.stack,
    requestedUrl: req.url,
    requestedMethod: req.method,
    requestTime: `${new Date()}`,
    status: err.status || 500,
  };

  logger.error(JSON.stringify(error));
  return res.status(err.status).json({ error: _.pick(error, ['message', 'status']) });
};
