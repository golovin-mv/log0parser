const assert = require('chai').assert;
const StreamTest = require('streamtest');
const Channel = require('../src/channel');
const {
  Transform
} = require('stream');

class MockedTransformStream extends Transform {
  _transform(data, encoding, callback) {
    callback(null , Buffer.from(data.toString() + 'lol'), 'utf-8');
  }
};

describe('Channel', () => {
  it('should throw ex if readStream is undefined', () => {
    assert.throws(() => {
      new Channel();
    }, 'ReadStream is undefined');

  });

  it('should throw ex if writeStream is undefined', () => {
    assert.throws(() => {
      new Channel({});
    }, 'WriteStream is undefined');
  });


  StreamTest.versions.forEach((version) => {
    describe(`${version} stream chain`, () => {

      it('should init transform stream', () => {
        const rs = StreamTest[version].fromChunks();
        const ts = new MockedTransformStream();
        
        const channel = new Channel(rs, ws, {
          transformStreams: ts
        })
        
        assert.deepEqual(channel.transformStreams , [ts]);
      });

    });
    
    it('should create streams chain', (done) => {
      const chunk = [
        `here's`,
        'johnny'
      ];
      
      rs = StreamTest[version].fromChunks([].concat(chunk));
      const ts = new MockedTransformStream();
      
      ws = StreamTest[version].toText((err, text) => {
        assert.equal(
          chunk.join('lol') + 'lol'
          ,text);
        done();
      });
      
      new Channel(rs, ws, {
        transformStreams: [ts]
      })

    });
    
    // TODO: make channel event test
    xit('should emmit start and end event', (done) => {
      
    })
  });

});