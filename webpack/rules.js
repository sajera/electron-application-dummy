module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  {
    // FIXME I am not sure this is a good idea - it is third time repeat the assets
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    // TODO please avoid to use it
    use: {
      loader: 'file-loader',
      options: {
        name: 'img/[name].[ext]',
        publicPath: '../.',
        // outputPath: 'file-loader',
      }
    }
  }
  // Put your webpack loader rules in this array.  This is where you would put
  // your ts-loader configuration for instance:
  /**
   * Typescript Example:
   *
   * {
   *   test: /\.tsx?$/,
   *   exclude: /(node_modules|.webpack)/,
   *   loaders: [{
   *     loader: 'ts-loader',
   *     options: {
   *       transpileOnly: true
   *     }
   *   }]
   * }
   */
]
