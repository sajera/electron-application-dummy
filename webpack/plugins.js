const dotenv = require('dotenv')
const Dotenv = require('dotenv-webpack')
const ESLint = require('eslint-webpack-plugin')

// IMPORTANT avoid overriding the original environment variables passed through the process
dotenv.config({ path: [`.env.local${process.env.NODE_ENV || ''}`, '.env'], debug: false })

module.exports = [
  // https://webpack.js.org/plugins/environment-plugin/#dotenvplugin
  new Dotenv({ systemvars: true }),
  // https://webpack.js.org/plugins/eslint-webpack-plugin/
  new ESLint({}),
  // TODO is it useful?
  // https://webpack.js.org/plugins/mini-css-extract-plugin/
  // env === ENV.PROD && new MiniCssExtractPlugin({
  //   filename: 'css/[name].[contenthash:6].css',
  //   chunkFilename: 'css/[name].[contenthash:6].chunk.css',
  // }),
]
