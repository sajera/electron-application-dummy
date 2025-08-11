const rules = require('./rules.js')
const plugins = require('./plugins.js')

module.exports = {
  entry: './src/main/index.js',
  // https://webpack.js.org/plugins/
  plugins: [
    ...plugins,
  ],
  // https://webpack.js.org/concepts/modules/
  module: {
    rules: [
      ...rules,
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'image/[name].[ext]',
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
            emitDirnameAll: true,
          },
        },
      },
    ],
  },
}
