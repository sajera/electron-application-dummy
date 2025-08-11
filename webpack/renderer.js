const rules = require('./rules.js')
const plugins = require('./plugins.js')
const Copy = require('copy-webpack-plugin')

module.exports = {
  // https://webpack.js.org/plugins/
  plugins: [
    ...plugins,
    // https://webpack.js.org/plugins/copy-webpack-plugin/
    // new Copy({ patterns: [{ from: './assets', to: 'assets' }] }),
  ],
  // https://webpack.js.org/concepts/modules/
  module: {
    rules: [
      ...rules,
      // {
      //   test: /\.css$/,
      //   use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      // },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
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
