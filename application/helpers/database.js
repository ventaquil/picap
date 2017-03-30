'use strict';

const mongodb = require('mongodb').MongoClient;
const process = require('process');

const database = function () {
    this.port = process.env.MONGODB_PORT || 27017;

    this.database = process.env.MONGODB_DATABASE || 'test';

    this.url = 'mongodb://localhost:' + this.port + '/' + this.database;
};
database.getInstance = function () {
    if (typeof this.instance === 'undefined') {
        this.instance = new database;
    }

    return this.instance;
};
database.prototype.connect = function (callback) {
    mongodb.connect(this.url, callback);
};

module.exports = database.getInstance();
