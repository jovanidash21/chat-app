'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSassBundle = new ExtractTextPlugin({
  filename: '[name].bundle.css',
  disable: false,
});

const webpackConfig = {
  devtool: 'source-map',
  entry: {
    main: './src/index.js',
    admin: './src/admin.js',
  },
  output: {
    path: path.join(__dirname, '/public/build'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: extractSassBundle.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  postcssFlexbugsFixes,
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9',
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.join(__dirname, '/sass/variables.scss'),
                  path.join(__dirname, '/sass/mixins.scss'),
                ],
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    extractSassBundle,
  ],
};

module.exports = function(env) {
  if ((env && env.minimize) || process.env.NODE_ENV === 'production') {
    webpackConfig.devtool = false;
  }

  return webpackConfig;
};
