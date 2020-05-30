import path from 'path';
import express from 'express';

import { attachDevTools } from '../../buildUtils/attachDevTools';

const PORT = process.env.PORT || 8080;

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

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});