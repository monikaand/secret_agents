import { logMessage } from './js/logger';
import './scss/style.scss';
// Log message to console
logMessage('Hello world!');
logMessage('Welcome to assda sad!');

if (typeof (module.hot) !== 'undefined') {
  module.hot.accept(); // eslint-disable-line no-undef
}