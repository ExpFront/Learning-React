module.exports = {
  entry: './scripts/index.jsx',
  output: {
    path: __dirname,
    filename: '.build/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
