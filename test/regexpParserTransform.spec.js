const assert = require('chai').assert;
const Readable = require('stream').Readable

const RegexpParserTransform = require('../src/transform/regexpParserTransform');
const Pattern = require('../src/pattern');
describe('regexParserTransform', () => {
  const patternStr = '\\[(?<date>.+)\\]\\s(?<type>[\\w\\.]+):\\s(?<message>.+)'
  let transform = null;

  beforeEach(() => {
    transform = new RegexpParserTransform(
      new Pattern(patternStr)
    );
  });
  
  it('should return parsed json string', () => {
    const date = '2017-10-30 02:34:37';
    const type = 'develop.ERROR'
    const message = 'On no! All is broken';
    
    const testObject = {
      date,
      type,
      message
    }
    
    const str = `[${date}] ${type}: ${message}`;
    
    transform._transform(Buffer.from(str, 'utf-8'), 'utf-8', (err, data) => {
      assert.deepEqual(data.toString(), JSON.stringify(testObject));
    })
    // TODO: info test
  });
});