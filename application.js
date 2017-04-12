'use strict';

const database = require('./application/helpers/database');
const express = require('express');
const process = require('process');
const app = express();

const port = process.env.PORT || 8000; // Choose application port

app.set('view engine', 'pug'); // Set render engine

const routes = require('./application/routes')(app);

database.connect(function (err, db) {
    console.log('MongoDB is running (port ' + database.port + ', database ' + database.database + ')');

    db.close();
});

app.listen(port, function () { // Listen on specified port
    console.log('Listening on port ' + port);
});
