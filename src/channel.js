const EventEmitter = require('events');

const createStream = (originStream, transformStreams) => transformStreams.reduce((prev, curr) => {
  return prev.pipe(curr);
}, originStream);

class Channel extends EventEmitter {
  constructor(readStream, writeStream, params = {}) {
    super(params);
    if (!readStream) {
      throw new Error('ReadStream is undefined');
    }
    if (!writeStream) {
      throw new Error('WriteStream is undefined');
    }

    this.transformStreams = [].concat(params.transformStreams);

    this.init(readStream, writeStream, this.transformStreams);
  }

  init(readStream, writeStream, transformStream = []) {

    readStream.on('end', () => {
      this.emit('end');
    });

    readStream.on('readable', () => this.emit('start'));

    return createStream(readStream, transformStream.concat(writeStream));
  }
}

module.exports = Channel;
