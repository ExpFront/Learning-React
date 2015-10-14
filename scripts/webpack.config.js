module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: '../build/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader?harmony'
      }
    ]
  }
}
