const winston = require('winston');
const config = require('../config');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: config.log.filePath,
    }),
  ],
});

module.exports = logger;
