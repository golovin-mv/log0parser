const mysql = require('mysql');

const Writer = require('./writer');
const { getObject, createPattern } = require('../paternWorker');

const logger = require('../../logger');

class MySqlWriter extends Writer {
  constructor(config) {
    super(config);
    this.connection = mysql.createConnection(this.config.db);
    this.pattern = createPattern(this.config.patternString);
  }

  _write(chunk, encoding, callback) {
    const obj = getObject(chunk.toString(), this.pattern);
    if (!obj) {
      return callback();
    }

    this.connection.query('INSERT INTO logs SET ?', obj, (error, results, fields) => {
      if (error) {
        logger.log('error', `Error ${chunk.toString()}, ${obj}`);
        return callback();
      }
      return callback();
    });
  }
}

module.exports = MySqlWriter;
