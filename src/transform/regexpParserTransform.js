const { Transform } = require('stream');

class RegexpParserTransform extends Transform {
  constructor(pattern, options) {
    super(options);
    this.pattern = pattern;
  }

  _transform(data, encoding, callback) {
    return this.pattern.parse(data)
      .then(str => callback(null, Buffer.from(str, 'utf-8')))
      .catch(errMessage => callback(new Error(errMessage), null));
  }
}

module.exports = RegexpParserTransform;
