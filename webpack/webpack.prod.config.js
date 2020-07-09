const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CLIENT = 'client';
const resolve = dir => path.resolve(__dirname, '..', dir);

module.exports = {
  entry: {
    main: [
      './index.js',
    ],
    loginPage:
    [
      './js/loginPage.js'
    ]
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: `${CLIENT}/[name].js`,
  },
  context: resolve('src/'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-compiled-loader',
            options: {
              htmlmin: false,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'views/helloWorld.ejs',
      filename: 'views/helloWorld.ejs',
      alwaysWriteToDisk: true,
      templateParameters: {
        name: '<%= name %>',
      },
      chunks: ['main'],
    }),
    new HtmlWebPackPlugin({
      template: 'views/loginPage.ejs',
      filename: 'views/loginPage.ejs',
      alwaysWriteToDisk: true,
      chunks: ['loginPage'],
    }),
    new HtmlWebpackHarddiskPlugin(),
    new MiniCssExtractPlugin({
      filename: `${CLIENT}/[name].css`,
    }),
  ],
};

