'use strict';

const mongodb = require('mongodb').MongoClient;
const process = require('process');

const database = function () {
    this.server = process.env.MONGODB_SERVER || 'localhost';

    this.port = process.env.MONGODB_PORT || 27017;

    this.database = process.env.MONGODB_DATABASE || 'test';

    this.url = 'mongodb://' + this.server + ':' + this.port + '/' + this.database;
};

database.prototype.connect = function (callback) {
    mongodb.connect(this.url, callback);
};

module.exports = new database;
