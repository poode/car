const compression = require('compression');

const users = require('../api/v1/routes/users');
const login = require('../api/v1/routes/login');
const notFound = require('../api/v1/routes/notFound');
const errorHandler = require('../middleware/errorHandler');
const logHandler = require('../middleware/logHandler');
const corsMiddleware = require('../middleware/cors');
const helmetMiddleware = require('../middleware/helmet');
const { isAuthorized } = require('../middleware/authorization');
const { RateLimiter } = require('../middleware/rateLimiter');
const { tooBusyMiddleware } = require('../middleware/tooBusy');
const { translatorMiddleware } = require('../middleware/translator');

module.exports = (app) => {
  app.use(compression());
  app.use(helmetMiddleware);
  app.use(logHandler);
  app.use(tooBusyMiddleware);
  app.use(corsMiddleware);
  app.use(new RateLimiter(15, 100).limiter);
  app.use(translatorMiddleware);
  app.use('/api/v1/login', login);
  // @TODO adding pagination middleware to prevent
  // using high records numbers on endpoint responses
  // app.use('/api/v1/?/limit/1/page/2');
  app.use('/api/v1/users', users);
  app.use(isAuthorized);
  app.use(new RateLimiter(15, 100).limiter);
  app.use('*', notFound);
  app.use(errorHandler);
};
