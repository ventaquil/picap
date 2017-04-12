'use strict';

const error = require('./controllers/error');
const homepage = require('./controllers/homepage');
const picture = require('./controllers/picture');

module.exports.register = function (app) {
    { // Homepage
        app.get('/', homepage.index_action);
        app.post('/', homepage.upload_action);
    }

    { // Picture
        app.get('/p/:url\.:ext', picture.show_action);
        app.get('/p/:url', picture.presentation_action);
    }

    app.all('*', error.code_404);
};
