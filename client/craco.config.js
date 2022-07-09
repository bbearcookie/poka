const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app/'),
      '@component': path.resolve(__dirname, 'src/component/'),
      '@page': path.resolve(__dirname, 'src/page/'),
      '@route': path.resolve(__dirname, 'src/route/'),
      '@template': path.resolve(__dirname, 'src/template/'),
      '@context': path.resolve(__dirname, 'src/context/'),
      '@': path.resolve(__dirname, 'src/')
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