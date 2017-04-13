'use strict';

const database = require('./../helpers/database');
const directory = require('./../helpers/directory');
const path = require('path');
const qr = require('qr-image');

module.exports = {
    'delete_action': function (req, res) {
        if (req.params.url && (req.session.uploaded.indexOf(req.params.url) >= 0)) {
            database.connect(function (err, db) {
                if (err) {
                    throw err;
                }

                db.collection('pictures', function (err, collection) {
                    if (err) {
                        throw err;
                    }

                    collection.updateOne({
                        'deleted': false,
                        'url': req.params.url
                    }, {
                        '$set': {'deleted': true}
                    }, function (err, response) {
                        if (err) {
                            throw err;
                        }

                        const success = response.modifiedCount > 0;

                        var message;
                        if (success) {
                            message = 'Picture was successfully deleted.';
                        } else {
                            message = 'You cannot do this.';
                        }

                        res.json({
                            'message': message,
                            'success': success
                        });
                    });
                });
            });
        } else {
            res.json({
                'message': 'Internal error.',
                'success': false
            });
        }
    },
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

                    collection.findOne({'deleted': false, 'url': req.params.url}, function (err, picture) {
                        db.close();

                        if (picture === null) {
                            return req.next();
                        }

                        res.render('picture/presentation', {
                            'qr': new Buffer(qr.imageSync(req.protocol + '://' + req.get('host') + req.path)).toString('base64'),
                            'session': req.session,
                            'src': req.path + '.' + picture.ext,
                            'title': 'Uploaded picture',
                            'url': picture.url
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

                    collection.findOne({'deleted': false, 'ext': req.params.ext, 'url': req.params.url}, function (err, picture) {
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
