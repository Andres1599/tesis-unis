const config = require('./src/config');
const logger = require('./src/middlewares/log/logger')(config);
const server = require('./src/server')(config, logger);

server.start();