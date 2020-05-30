const webpack = require('webpack');
const path = require('path');

const nodeExternals = require('webpack-node-externals');

const resolve = dir => path.resolve(__dirname, '..', dir);

module.exports = (env, argv) => ({
  entry: [resolve('src/server/server.js')],
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: 'server/[name].js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: argv.mode === 'production',
    }),
  ],
});