'use strict';

const directory = require('./helpers/directory');
const error = require('./controllers/error');
const express = require('express');
const file_upload = require('express-fileupload');
const homepage = require('./controllers/homepage');
const picture = require('./controllers/picture');
const process = require('process');
const session = require('express-session');

const routes = function (app) {
    this._app = app;

    this._middlewares();

    this._routes();
};

routes.prototype._middlewares = function () {
    const registered = [
        file_upload(),
        express.static(directory.public()),
        session({
            'cookie': {
                'secure': false
            },
            'name': 'sid',
            'resave': false,
            'saveUninitialized': true,
            'secret': process.env.SECURE || 'secure'
        })
    ];

    const app = this._app;

    registered.forEach(function (middleware) {
        app.use(middleware);
    });
};

routes.prototype._routes = function () {
    { // Homepage
        this._app.get('/', homepage.index_action);
        this._app.post('/', homepage.upload_action);
    }

    { // Picture
        this._app.get('/p/:url\.:ext', picture.show_action);
        this._app.get('/p/:url', picture.presentation_action);
    }

    this._app.all('*', error.code_404);
};

module.exports = function (app) {
    return new routes(app);
};
