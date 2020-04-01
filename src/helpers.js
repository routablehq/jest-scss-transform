/**
 * helpers.js
 * @fileOverview Utility functions used by jest-scss-transform.
 */

const fs = require('fs');
const crypto = require('crypto');

const exportStartRegex = /\n:export.{\n*/;
const exportEndRegex = /\n*}/;
const commentsMatcher = /(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm;
const endOfLineMatcher = /;/g;
const scssFileExtMatcher = /.scss$/;
const sepStr = ':';
const emptyStr = '';

module.exports.getExported = (str) => str.split(exportStartRegex)[1].split(exportEndRegex)[0];
module.exports.getStrippedSource = (str) => str.replace(commentsMatcher, emptyStr).trim();
module.exports.hasExports = (str) => exportStartRegex.test(str);
module.exports.isSupportedFile = (filename) => scssFileExtMatcher.test(filename);
module.exports.makeExportsString = (obj = {}) => `module.exports = ${JSON.stringify(obj)};`;

module.exports.getLines = (str) => (
  str
    .split(endOfLineMatcher)
    .map((line) => line.trim())
    .filter((line) => !!line.length)
);

module.exports.parseExportsToObject = (lines) => (
  lines.reduce((obj, line) => {
    const [name, value] = line.split(sepStr);
    return {
      ...obj,
      [name.trim()]: value.trim().replace(endOfLineMatcher, emptyStr),
    };
  }, {})
);

module.exports.getCacheKey = () => (
  crypto
    .createHash('md5')
    .update(fs.readFileSync(__filename))
    .digest('hex')
);
