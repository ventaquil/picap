'use strict';

const async = require('async');
const crypto = require('crypto');
const database = require('./../helpers/database');
const directory = require('./../helpers/directory');
const dateformat = require('dateformat');
const fs = require('fs');
const path = require('path');

function random(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports = {
    'indexAction': function (req, res) {
        res.render('homepage/index', {'title': 'Welcome on picap!'});
    },
    'uploadAction': function (req, res) {
        const allowed = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png']; // Allowed mime types
        const max_size = 10485760; // 10MB, 10 * 1024 * 1024

        if (typeof req.files.picture === 'undefined') {
            return req.next();
        }

        const picture = req.files.picture;
        const mimetype = picture.mimetype.toLowerCase();

        const place = (allowed.indexOf(mimetype) !== -1) ? 'pictures' : 'trash';

        const ext = mimetype.split('/')[1]; // File extension
        const filename = crypto.createHmac('sha256', picture.data).update(new Date().getTime().toString())
            .digest('hex'); // Create filename
        const file = filename.concat('.', ext); // Create filename with extension

        var filepath = path.join(directory.storage(), place); // Create filepath

        var date = {};
        async.each(['yyyy', 'mm', 'dd', 'HH', 'MM', 'ss'], function (part, callback) { // Create directories
            filepath = path.join(filepath, date[part] = dateformat(part));

            if (fs.existsSync(filepath) === false) {
                fs.mkdir(filepath);
            }

            callback();
        }, function (err) {
            if (err) {
                throw err;
            }

            filepath = path.join(filepath, file);

            if (picture.data.byteLength > max_size) {
                throw 'Oversize';
            }

            picture.mv(filepath, function (err) { // Move path or catch error
                if (err) {
                    throw err;
                }

                if (allowed.indexOf(mimetype) !== -1) {
                    database.connect(function (err, db) {
                        if (err) {
                            throw err;
                        }

                        var datepath = '';
                        for (var key in date) {
                            datepath = path.join(datepath, date[key]);
                        }

                        const url = crypto.createHmac('sha256', filename).update(datepath).digest('hex')
                            .substr(0, random(4, 16));

                        db.collection('pictures', function (err, collection) {
                            if (err) {
                                throw err;
                            }

                            collection.insertOne({
                                'date': {
                                    'year': date.yyyy,
                                    'month': date.mm,
                                    'day': date.dd,
                                    'hour': date.HH,
                                    'minute': date.MM,
                                    'second': date.ss
                                },
                                'directory': datepath,
                                'ext': ext,
                                'file': file,
                                'filename': filename,
                                'size': picture.data.byteLength,
                                'timestamp': new Date().getTime(),
                                'url': url
                            });

                            db.close();

                            res.redirect('/p/' + url);
                        });
                    });
                }
            });
        });
    }
};
