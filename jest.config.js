const path = require('path');

module.exports = {
  automock: false,
  testMatch: [
    '<rootDir>/**/*.test.js'
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.scss$': path.resolve(__dirname, 'src/index.js')
  },
  transformIgnorePatterns: ['/node_modules/'],
  verbose: true
};
