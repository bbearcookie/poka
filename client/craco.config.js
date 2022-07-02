const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@app': path.resolve(__dirname, 'src/app/'),
      '@component': path.resolve(__dirname, 'src/component/'),
      '@page': path.resolve(__dirname, 'src/page/'),
      '@template': path.resolve(__dirname, 'src/template/'),
      '@context': path.resolve(__dirname, 'src/context/'),
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@(.*)$': '<rootDir>/src$1',
      }
    }
  }
};