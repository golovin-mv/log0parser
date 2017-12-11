const FileReader = require('./fileReader');
const SftpReader = require('./sfltReader');

const factories = {
  FILE: FileReader,
  SFTP: SftpReader,
};

class ReadStreamFactory {
  build(type, config = {}) {
    if (Object.keys(factories).indexOf(type) === -1) {
      throw new Error('Unknown reader type');
    }
    return new factories[type](config);
  }
}

module.exports = ReadStreamFactory;
