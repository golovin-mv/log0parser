const MySqlWritibleStream = require('./mySqlWritibleStream');
const ReadStreamFactory = require('./readStreamFactory/readStramFactory');
const config = require('../config');
const Parser = require('./parser');
const logger = require('./logger');

const readFactory = new ReadStreamFactory();

const bootstrap = () => {
  const parser = new Parser();

  parser.on('end', () => {
    logger.log('info', 'bootstrap ended');
  });

  const rs = readFactory.create(config.reader.type, config.reader.config);
  parser.read(
    rs,
    new MySqlWritibleStream(),
  ).catch(err => logger.log('error', err.message));
};

module.exports = {
  bootstrap,
};
