'use strict';

const database = require('./application/helpers/database');
const express = require('express');
const logger =  require('./application/helpers/logger');
const process = require('process');
const app = express();

const port = process.env.PICAP_PORT || 8000; // Choose application port

app.set('view engine', 'pug'); // Set render engine

const routes = require('./application/routes')(app);

database.connect(function (err, db) {
    logger.log('MongoDB is running (port ' + database.port + ', database ' + database.database + ')', true);

    db.close();
});

app.listen(port, function () { // Listen on specified port
    logger.log('Listening on port ' + port, true);
});
