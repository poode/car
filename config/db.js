const mysql = require('mysql2/promise');

const { logger } = require('./logger');

async function db() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    logger.info('connected to database...');
    return connection;
  } catch (error) {
    logger.error(`unable to connect to database... error: ${JSON.stringify(error)}`);
    return false;
  }
}

module.exports = (async () => {
  try {
    const connection = await db();
    return connection;
  } catch (error) {
    return error;
  }
})();
