const rules = require('./rules.js')
const plugins = require('./plugins.js')
const relocator = require('@vercel/webpack-asset-relocator-loader')

module.exports = {
  entry: './src/main/index.js',
  // https://webpack.js.org/plugins/
  plugins: [
    ...plugins,
    { // https://github.com/electron/forge/issues/2412#issuecomment-1062106849
      apply(compiler) {
        compiler.hooks.compilation.tap('webpack-asset-relocator-loader', compilation => {
          relocator.initAssetCache(compilation, 'native_modules')
        })
      },
    },
  ],
  // https://webpack.js.org/concepts/modules/
  module: {
    rules: [
      ...rules,
      {
        test: /\.(png|jpe?g|gif|svg|sqlite|db)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            // publicPath: '../.',
          }
        }
      },
      {
        test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: '@vercel/webpack-asset-relocator-loader',
          options: {
            outputAssetBase: 'native_modules',
          },
        },
      },
    ],
  },
}
