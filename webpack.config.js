const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'app'),
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'build.js',
  },
  module: {
    noParse: ['node_modules/react'],
    loaders: [
      { test: /(.js|.jsx)/, exclude: /node_modules/, loaders: ['babel?cacheDirectory=true'] },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /(.woff|.ttf|.eot|.svg|.jpg|.png)/, loader: "file-loader" },
    ],
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.json', '.jsx', '.css', '.svg'],
  },
}
