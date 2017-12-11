const XRegExp = require('xregexp');

const getFiealdWithType = (feildDesc = '') => {
  const [name, type] = feildDesc.split(':');
  return {
    name,
    type: type || 'string',
  };
};

const getPatterFields = (pattern) => {
  const regex = /\?<([\w:]+)>/g;
  const result = [];
  let curr;
  do {
    curr = regex.exec(pattern);
    if (curr) {
      result.push(getFiealdWithType(curr[1]));
    }
  } while (curr);
  return result;
};

class Pattern {
  constructor(patternString) {
    this.patternString = patternString;
    this.fields = getPatterFields(this.patternString);
  }

  getFieldNames() {
    return this.fields.map(el => el.name);
  }

  parse(data) {
    try {
      const parsedObj = XRegExp.exec(data.toString(), this.xRegExpPattern);

      const obj = this.pattern.fields
        .reduce((acc, curr) => {
          acc[curr] = parsedObj[curr] ? parsedObj[curr] : null;
          return acc;
        }, {});
      return Promise.resolve(JSON.stringify(obj));
    } catch ($ex) {
      return Promise.resolve($ex.message);
    }
  }
}

module.exports = Pattern;
