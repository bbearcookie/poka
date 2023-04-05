const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app/'),
      '@api': path.resolve(__dirname, 'src/api/'),
      '@context': path.resolve(__dirname, 'src/context/'),
      '@component': path.resolve(__dirname, 'src/component/'),
      '@hook': path.resolve(__dirname, 'src/hook/'),
      '@page': path.resolve(__dirname, 'src/page/'),
      '@util': path.resolve(__dirname, 'src/util/'),
      '@route': path.resolve(__dirname, 'src/route/'),
      '@template': path.resolve(__dirname, 'src/template/'),
      '@': path.resolve(__dirname, 'src/')
    }
  },
  babel: {
    plugins: ["babel-plugin-styled-components"],
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@(.*)$': '<rootDir>/src$1',
      }
    }
  }
};