const dotenv = require('dotenv')
const DotenvWebpack = require('dotenv-webpack')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

// IMPORTANT avoid overriding the original environment variables passed through the process
dotenv.config({ path: [`.env.local${process.env.NODE_ENV || ''}`, '.env'], debug: false })

module.exports = [
  // https://webpack.js.org/plugins/environment-plugin/#dotenvplugin
  new DotenvWebpack({ systemvars: true }),
  // TODO is it useful?
  // https://webpack.js.org/plugins/mini-css-extract-plugin/
  // env === ENV.PROD && new MiniCssExtractPlugin({
  //   filename: 'css/[name].[contenthash:6].css',
  //   chunkFilename: 'css/[name].[contenthash:6].chunk.css',
  // }),
  // TODO
  // https://webpack.js.org/plugins/eslint-webpack-plugin/
  new ESLintWebpackPlugin({
    extensions: ['js', 'jsx'],
    lintDirtyModulesOnly: false,
    context: __dirname,
    // eslintPath: nodeModule('eslint'),
    // failOnError: varBoolean(process.env.ESLINT_NO_DEV_ERRORS),
    // cache: true,
    // cacheLocation: path.resolve(paths.wpCache, '.eslint/'),
    // // ESLint class options
    // cwd: paths.app,
    // resolvePluginsRelativeTo: paths.scripts,
  }),
]
