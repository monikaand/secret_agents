import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import { mainRouter } from './routers/mainRouter';
import { initialisePassport } from './config/passport';

import { attachDevTools } from '../../buildUtils/attachDevTools';

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '../views'));

server.use(bodyParser.json());

initialisePassport();

if (!PRODUCTION) {
  attachDevTools(server);
}

server.use('/', mainRouter);

server.use('/client', express.static(path.resolve(__dirname, '../client')));
server.use('/assets', express.static(path.resolve(__dirname, '../assets')));

server.get('/api/:name', (req, res) => {
  res.render('helloWorld', { name: req.params.name });
});

export { server };