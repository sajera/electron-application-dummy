const rules = require('./rules.js')
const plugins = require('./plugins.js')

module.exports = {
  // https://webpack.js.org/plugins/
  plugins: [
    ...plugins,
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
