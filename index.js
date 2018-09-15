const express = require('express');
const cluster = require('cluster');
const os = require('os');
require('dotenv').config();

// const { logger } = require('./config/logger');

const app = express();
app.use(express.json());

require('./startup/routes')(app);

function server(port) {
  app.listen(port, () => {});// logger.info(`Listening on port ${port}...`));
}

function forkCPUs(operatingServer) {
  const CPUS = os.cpus();
  if (cluster.isMaster) {
    CPUS.forEach(() => {
      cluster.fork();
    });
    cluster.on('listening', (worker) => {
      // logger.info(`Cluster ${worker.process.pid} connected`);
    });
    cluster.on('disconnect', (worker) => {
      // logger.info(`Cluster ${worker.process.pid} disconnected`);
    });
    cluster.on('exit', (worker) => {
      // logger.info(`Cluster ${worker.process.pid} is dead`);
      // Ensuring a new cluster will start if an old one dies
      cluster.fork();
    });
  } else {
    operatingServer(Number(process.env.PORT));
  }
}
if (process.env.NODE_ENV === 'production') {
  forkCPUs(server);
} else {
  server(Number(process.env.PORT));
}
