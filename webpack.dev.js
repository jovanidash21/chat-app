'use strict';

const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ],
});
