const winston = require('winston');

const logger = winston.createLogger({
  level: 'silly',
  exitOnError: false,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
  ),
  maxsize: 5242880,
  maxFiles: 5,
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      prettyPrint: true,
      humanReadableUnhandledException: true,
      handleExceptions: true,
    }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      handleExceptions: true,
      prettyPrint: true,
      humanReadableUnhandledException: true,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log', handleExceptions: true }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
module.exports = {
  logger,
};
