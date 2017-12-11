const tmp = require('tmp');
const assert = require('chai').assert;
const { ReadStream } = require('fs');
const FileReader = require('../src/readers/fileReader');

describe('FiteReader', () => {
  it('should throw ex woth wrong config', () => {
    assert.throws(() => {
      (new FileReader()).build()
    }, 'Cannot create FileReader wrong config');
    
    assert.throws(() => {
      (new FileReader({
        filePath: 'ololo'
      })).build()
    }, 'Cannot create FileReader wrong config');
  });
  
  it('should create read stream',() => {
    const tmpobj = tmp.fileSync();
    const fr = new FileReader({
      filePath: tmpobj.name
    });
    
    return fr.build()
      .then(stream => assert.instanceOf(stream, ReadStream));
  });
});