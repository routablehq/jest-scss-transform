const fs = require('fs');
const path = require('path');
const jest = require('jest');
const sinon = require('sinon');

const transformer = require('./index');

const basicFile = '../test/basic.scss';
const commentsFile = '../test/comments.scss';
const formattingFile = '../test/formatting.scss';
const noExportsFile = '../test/none.scss';
const incorrectExtFile = '../test/filename.css';

const contentsBasic = fs.readFileSync(path.resolve(__dirname, basicFile), 'utf8');
const contentsComments = fs.readFileSync(path.resolve(__dirname, commentsFile), 'utf8');
const contentsFormatting = fs.readFileSync(path.resolve(__dirname, formattingFile), 'utf8');
const contentsNoExports = fs.readFileSync(path.resolve(__dirname, noExportsFile), 'utf8');
const contentsIncorrectExt = fs.readFileSync(path.resolve(__dirname, incorrectExtFile), 'utf8');

const expectedParsed = 'module.exports = {"error":"$errorColor","success":"$successColor","warning":"$warningColor"};';
const emptyModuleString = 'module.exports = {};';

describe('jest-scss-transform', () => {
  describe('transformer.process', () => {
    beforeEach(() => {
      sinon.restore();
    });

    it('returns empty module for file extensions other than .scss', () => {
      expect(transformer.process(contentsIncorrectExt, incorrectExtFile)).toBe(emptyModuleString);
    });

    it('returns empty module for files with no exports', () => {
      expect(transformer.process(contentsNoExports, noExportsFile)).toBe(emptyModuleString);
    });

    it('processes files with basic formatting', () => {
      expect(transformer.process(contentsBasic, basicFile)).toBe(expectedParsed);
    });

    it('processes files with commented exports', () => {
      expect(transformer.process(contentsComments, commentsFile)).toBe(expectedParsed);
    });

    it('processes files with poorly formatted exports', () => {
      expect(transformer.process(contentsFormatting, formattingFile)).toBe(expectedParsed);
    });

    it.each(['27.0.0', '27.5.2', '28.0.0', '28.0.1'])(
      'returns object with code property for jest versions %s and above',
      (jestVersion) => {
        sinon.stub(jest, 'getVersion').returns(jestVersion);
        expect(transformer.process(contentsBasic, commentsFile)).toEqual({ code: expectedParsed });
      },
    );
  });

  describe('transformer.getCacheKey', () => {
    it('returns the expected cache key', () => {
      const fsStub = sinon.stub(fs, 'readFileSync').returns('test contents');
      const result = transformer.getCacheKey();
      fsStub.restore();
      expect(result).toBe('df14e44b311152c34358a675ae34afe0');
    });
  });
});
