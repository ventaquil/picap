'use strict';

const dateformat = require('dateformat');
const directory = require('./directory');
const fs = require('fs');
const path = require('path');

module.exports = {
    '_get_message': function (data) {
        const hour = dateformat('HH:MM:ss');

        return '[' + hour + ']: ' + data;
    },
    'log': function (data, callback) {
        if (!callback) {
            callback = function () {};
        }

        var log_path = directory.logs();
        ['yyyy', 'mm'].forEach(function (part) {
            log_path = path.join(log_path, dateformat(part));

            if (fs.existsSync(log_path) === false) {
                fs.mkdirSync(log_path);
            }
        });

        const filename = dateformat('dd') + '.log';

        log_path = path.join(log_path, filename);

        fs.appendFile(log_path, this._get_message(data), null, callback);
    }
};
