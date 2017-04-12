'use strict';

const database = require('./../helpers/database');
const directory = require('./../helpers/directory');
const path = require('path');
const qr = require('qr-image');

module.exports = {
    'presentation_action': function (req, res) {
        if (req.params.url) {
            database.connect(function (err, db) {
                if (err) {
                    throw err;
                }

                db.collection('pictures', function (err, collection) {
                    if (err) {
                        throw err;
                    }

                    collection.findOne({'url': req.params.url}, function (err, picture) {
                        db.close();

                        if (picture === null) {
                            return req.next();
                        }

                        res.render('picture/presentation', {
                            'qr': new Buffer(qr.imageSync(req.protocol + '://' + req.get('host') + req.path)).toString('base64'),
                            'src': req.path + '.' + picture.ext,
                            'title': 'Uploaded picture'
                        });
                    });
                });
            });
        } else {
            req.next();
        }
    },
    'show_action': function (req, res) {
        if (req.params.url && req.params.ext) {
            database.connect(function (err, db) {
                if (err) {
                    throw err;
                }

                db.collection('pictures', function (err, collection) {
                    if (err) {
                        throw err;
                    }

                    collection.findOne({'url': req.params.url, 'ext': req.params.ext}, function (err, picture) {
                        db.close();

                        if (picture === null) {
                            return req.next();
                        }

                        res.sendFile(path.join(directory.pictures(), picture.directory, picture.file));
                    });
                });
            });
        } else {
            req.next();
        }
    }
};
