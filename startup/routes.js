const compression = require('compression');

const { getList } = require('../util/helpers/helpers');
const users = require('../api/v1/routes/users');
const login = require('../api/v1/routes/login');
const contactUs = require('../api/v1/routes/contactUs');
const orders = require('../api/v1/routes/orders');
const notFound = require('../middleware/notFound');
const errorHandler = require('../middleware/errorHandler');
const logHandler = require('../middleware/logHandler');
const corsMiddleware = require('../middleware/cors');
const helmetMiddleware = require('../middleware/helmet');
const { isAuthorized } = require('../middleware/authorization');
const { RateLimiter } = require('../middleware/rateLimiter');
const { tooBusyMiddleware } = require('../middleware/tooBusy');
const { translatorMiddleware } = require('../middleware/translator');
const { verificationMiddleware } = require('../middleware/userMiddlewares/verifyUser');

module.exports = (app) => {
  app.use(compression());
  app.use(helmetMiddleware);
  app.use(logHandler);
  app.use(tooBusyMiddleware);
  app.use(corsMiddleware);
  app.use(new RateLimiter(15, 100).limiter);
  app.use(translatorMiddleware);
  app.use('/api/v1/login', login);
  app.use('/api/v1/users', users);
  app.use(isAuthorized);
  app.use(verificationMiddleware);
  app.use('/api/v1/list', getList);
  app.use('/api/v1/contact-us', contactUs);
  app.use('/api/v1/orders', orders);
  app.use(new RateLimiter(15, 100).limiter);
  app.use('*', notFound);
  app.use(errorHandler);
};
