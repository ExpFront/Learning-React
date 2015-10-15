module.exports = {
  entry: {
    app: './scripts/index.jsx',
    vendors: ['react']
  },
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
