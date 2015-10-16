module.exports = {
  entry: './scripts/index.jsx',
  output: {
    path: __dirname,
    filename: './build/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
