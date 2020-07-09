import path from 'path';
import express from 'express';

import { attachDevTools } from '../../buildUtils/attachDevTools';

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '../views'));

if (!PRODUCTION) {
  attachDevTools(server);
}

server.use('/client', express.static(path.resolve(__dirname, '../client')));
server.use('/assets', express.static(path.resolve(__dirname, '../assets')));

server.get('/api/:name', (req, res) => {
  res.render('helloWorld', { name: req.params.name });
});

server.get('/login', (req, res) => {
  res.render('./loginPage');
});

export { server };