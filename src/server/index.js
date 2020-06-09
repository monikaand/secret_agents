import http from 'http';
import { server } from './server';

const PORT = process.env.PORT || 8080;

const httpServer = http.createServer(server);
let currentApp = server;

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

if (module.hot) {
  module.hot.accept('./server', () => {
    httpServer.removeListener('request', currentApp);
    httpServer.on('request', server);
    currentApp = server;
  });
}