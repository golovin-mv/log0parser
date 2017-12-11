const fs = require('fs');
const path = require('path');

const Reader = require('./reader');

const vadilate = config => config.filePath && fs.existsSync(config.filePath);

class FileReader extends Reader {
  build() {
    if (!vadilate(this.config)) {
      throw new Error('Cannot create FileReader wrong config');
    }

    this.stream = this.createStream();

    return Promise.resolve()
      .then(() => this.stream);
  }

  createStream() {
    const opt = {
      encoding: 'utf-8',
    };

    return fs.createReadStream(path.normalize(this.config.filePath), opt);
  }
}

module.exports = FileReader;
