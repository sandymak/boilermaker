'use strict';

const { resolve } = require('path');

module.exports = {
  entry: './app/main',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  // what is this????
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        // what does this do???
        include: resolve(__dirname, './app'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  }
};
