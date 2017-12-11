const SftpClient = require('ssh2-sftp-client');
const Reader = require('./reader');

const fs = require('fs');
const path = require('path');


const vadilate = config => !!config;

class SftpReader extends Reader {
  build() {
    if (!vadilate(this.config)) {
      throw new Error('Cannot create Sftp Read Stream wrong config');
    }

    const sftp = new SftpClient();

    return sftp.connect(this.config)
      .then(() => sftp.get(this.config.filePath))
      .then((ws) => {
        this.stream = ws;
        return this.stream;
      });
  }
}

module.exports = SftpReader;
