const compression = require('compression');
const paginate = require('express-paginate');

const genres = require('../api/v1/routes/genres');
const customers = require('../api/v1/routes/customers');
const movies = require('../api/v1/routes/movies');
const rentals = require('../api/v1/routes/rentals');
const users = require('../api/v1/routes/users');
const logins = require('../api/v1/routes/logins');
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
  app.use('/api/v1/logins', logins);
  app.use(paginate.middleware(10, 50));
  app.use('/api/v1/movies', movies);
  app.use(isAuthorized);
  app.use(new RateLimiter(15, 100).limiter);
  app.use('/api/v1/genres', genres);
  app.use('/api/v1/customers', customers);
  app.use('/api/v1/rentals', rentals);
  app.use('/api/v1/users', users);
  app.use('*', notFound);
  app.use(errorHandler);
};
