const assert = require('chai').assert;
const Pattern = require('../src/pattern');

describe('pattern', () => {
  const patternStr = '\\[(?<date:date>.+)\\]\\s(?<type>[\\w\\.]+):\\s(?<message:int>.+)';

  it('should save string pattern', () => {
    const pattern = new Pattern(patternStr);
    assert.equal(pattern.patternString, patternStr);
  });

  it('should parse field name woth types', () => {
    const pattern = new Pattern(patternStr);
    assert.deepEqual(pattern.fields, [{
      name: 'date',
      type: 'date'
    },{
      name: 'type',
      type: 'string'
    }, {
      name: 'message',
      type: 'int'
    }]);
    
  });

  it('should parse needs fields', () => {
    const pattern = new Pattern(patternStr);
    assert.deepEqual(pattern.getFieldNames(), ['date', 'type', 'message']);
  });

  it('should return object', () => {
    const date = '2017-10-30 02:34:37';
    const type = 'develop.ERROR'
    const message = 'On no! All is broken';

    const testObject = {
      date,
      type,
      message
    }

    const str = `[${date}] ${type}: ${message}`;

    const pattern = new Pattern(patternStr);

    pattern.parse((err, data) => {
      assert.equal(data, testObject);
    })
  });
});