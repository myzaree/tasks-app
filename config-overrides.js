const path = require('path');
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      paths: ['./src/styles', './node_modules'],
      javascriptEnabled: true
    }
  }),
  addWebpackAlias({
    ['@components']: path.resolve(__dirname, './src/components'),
    ['@layout']: path.resolve(__dirname, './src/layout'),
    ['@store']: path.resolve(__dirname, './src/store'),
    ['@services']: path.resolve(__dirname, './src/services'),
    ['@types']: path.resolve(__dirname, './src/types'),
    ['@hooks']: path.resolve(__dirname, './src/hooks'),
    ['@utils']: path.resolve(__dirname, './src/utils')
  })
);