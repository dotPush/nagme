import AuthApp from './AuthApp.js';

const app = new AuthApp();
document.body.prepend(app.renderDOM());