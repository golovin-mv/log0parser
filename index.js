const Client = require('./src/client');
const ReaderFactory = require('./src/readers/readerFactory');
const WriterFactory = require('./src/writers/writerFactory');
const logger = require('./logger');
const config = require('./config');

/**
 *
 * @param {object} params
 * @returns {Reader}
 */
const createReader = (params) => {
  const readFactory = new ReaderFactory();
  return readFactory.build(params.reader.type, params.reader.config);
};

/**
 *
 * @param {object} params
 * @returns {Writer}
 */
const createWriter = (params) => {
  const writerFactory = new WriterFactory();
  return writerFactory.build(params.writer.type, params.writer.config);
};

const client = new Client(config.isMaster);
// создаем reader
client.reader = createReader(config);
// создадим writer
client.writer = createWriter(config);
// запускаем клиент
client.start()
  .catch(err => logger.error(err))
  .then(process.exit(1));
