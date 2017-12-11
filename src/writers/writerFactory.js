const MySqlWriter = require('./mySqlWriter');

const factories = {
  MYSQL: MySqlWriter,
};

class WriterFactory {
  build(type, config = {}) {
    if (Object.keys(factories).indexOf(type) === -1) {
      throw new Error('Unknown reader type');
    }
    return new factories[type](config);
  }
}

module.exports = WriterFactory;
