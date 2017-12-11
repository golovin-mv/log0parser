const { Writable } = require('stream');

class Writer extends Writable {
  constructor(config) {
    super(config);
    this.config = config;
  }
}

module.exports = Writer;
