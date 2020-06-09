const webpack = require('webpack');
const path = require('path');
const StartServerPlugin = require('start-server-webpack-plugin');

const nodeExternals = require('webpack-node-externals');

const resolve = dir => path.resolve(__dirname, '..', dir);

module.exports = ({ mode }) => ({
  entry: [
    ...(mode === 'development' ? ['webpack/hot/poll?1000'] : []),
    resolve('src/server/index.js'),
  ],
  mode: mode,
  output: {
    path: resolve('dist/server'),
    publicPath: '/',
    filename: 'server.js',
  },
  watch: mode === 'development',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
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
      PRODUCTION: mode === 'production',
    }),
    ...(
      mode === 'development' ? [
        new StartServerPlugin('server.js'),
        new webpack.HotModuleReplacementPlugin(),
      ] : []
    ),
  ],
});