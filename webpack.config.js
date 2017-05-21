const path = require('path');

const config = {
  entry: [
    './examples/index.es6'
  ],

  output: {
    filename: 'index-webpack.js',
    path: path.join(__dirname, 'examples')
  },

  module: {
    loaders: [
      {
        test: /\.es6?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  devtool: 'eval-source-map'
};

module.exports = config;
