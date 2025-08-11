const rules = require('./rules.js')
const plugins = require('./plugins.js')
const Copy = require('copy-webpack-plugin')

module.exports = {
  // https://webpack.js.org/plugins/
  plugins: [
    ...plugins,
    // https://webpack.js.org/plugins/copy-webpack-plugin/
    // NOTE It is much easier to understand and pass relative paths that are similar to the real structure
    new Copy({ patterns: [{ from: './static', to: './static' }] }),
  ],
  // https://webpack.js.org/concepts/modules/
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'image/[name].[ext]',
            publicPath: '../.',
          }
        }
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            exclude: /node_modules/,
            presets: ['@babel/preset-react']
          }
        }
      }
    ],
  },
}
