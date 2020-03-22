const path = require('path');

module.exports = {
  automock: false,
  coverageReporters: ['json-summary'],
  testMatch: [
    '<rootDir>/**/*.test.js'
  ],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/example', '<rootDir>/dist'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.scss$': path.resolve(__dirname, 'src/index.js')
  },
  transformIgnorePatterns: ['/node_modules/'],
  verbose: true
};
