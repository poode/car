const https = require('https');
const fs = require('fs');
const { logger } = require('../../config/logger');
const loggerControl = require('../../util/LoggersControl/loggerControl')();

const credentials = {
  key: fs.readFileSync('./my-api.key', 'utf8'),
  cert: fs.readFileSync('./my-api.cert', 'utf8'),
};

function httpsServer(app) {
  https
    .createServer(credentials, app)
    .listen(process.env.PORT, () => {
      if (loggerControl) {
        return logger.info(`Listening on port ${process.env.PORT}...`);
      }
      return false;
    });
}

module.exports = {
  httpsServer,
};
