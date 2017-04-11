'use strict';

const database = require('./application/helpers/database');
const directory = require('./application/helpers/directory');
const express = require('express');
const file_upload = require('express-fileupload');
const logger =  require('./application/helpers/logger');
const process = require('process');
const routes = require('./application/routes');

const app = express();

const port = process.env.PORT || 8000; // Choose application port

app.set('view engine', 'pug'); // Set render engine

app.use(file_upload()); // Add file upload module

app.use(express.static(directory.public())); // Set static folder

database.connect(function (err, db) {
    logger.log('MongoDB is running (port ' + database.port + ', database ' + database.database + ')', true);

    db.close();
});

app.listen(port, function () { // Listen on specified port
    logger.log('Listening on port ' + port, true);
});

routes.register(app); // Register routes
