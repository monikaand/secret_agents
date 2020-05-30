import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack/webpack.dev.config';

export const attachDevTools = (app) => {
  config.context = path.resolve(__dirname, '../../src');
  config.output.path = path.resolve(__dirname, '..');


  const compiler = webpack(config);
  const hotMiddleware = webpackHotMiddleware(compiler);

  app.use(hotMiddleware);
  app.use(webpackDevMiddleware(compiler, {
    reload: true,
  }));


  compiler.hooks.compilation.tap('reloadHtml', (compilation) => {
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const hooks = HtmlWebpackPlugin.getHooks(compilation);

    hooks.afterEmit.tap('reloadHtml', () => {
      hotMiddleware.publish({ action: 'reload' });
    });
  });
};