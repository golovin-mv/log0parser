const logger = require('../logger');

const getClintName = () => '';

class Client {
  constructor(isMaster = false, channel, pattern, name) {
    this.isMaster = isMaster;
    this.channel = channel;
    this.pattern = pattern;

    this.name = name || getClintName();

    channel.on('start', () => logger.info(`Client ${this.name} is started`));
  }
}

module.exports = Client;
