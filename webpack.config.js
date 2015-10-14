module.exports = {
  entry: './scripts/index.js',
  output: {
    path: __dirname,
    filename: '../build/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
