const express = require('express');
require('dotenv').config();
const { logger } = require('./config/logger');
const loggerControl = require('./util/LoggersControl/loggerControl')();
// const { httpsServer } = require('./util/runningServerUsingHttps/httpsServer');

const app = express();
app.use(express.json());

require('./startup/db')();
require('./startup/routes')(app);

function server(port) {
  app.listen(port, () => {
    if (loggerControl) {
      return logger.info(`Listening on port ${process.env.PORT}...`);
    }
    return false;
  });
}

// server(process.env.PORT);

module.exports = {
  server,
};
