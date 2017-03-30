'use strict';

const error = require('./controllers/error');
const homepage = require('./controllers/homepage');
const picture = require('./controllers/picture');

module.exports.register = function (app) {
    { // Homepage
        app.get('/', homepage.indexAction);
        app.post('/', homepage.uploadAction);
    }

    { // Picture
        app.get('/p/:url\.:ext', picture.showAction);
        app.get('/p/:url', picture.presentationAction);
    }

    app.all('*', error.code404);
};
