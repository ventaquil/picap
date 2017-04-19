'use strict';

const path = require('path');

module.exports = {
    'assets': function () {
        return path.join(__dirname, '..', '..', 'assets');
    },
    'javascript': function () {
        return path.join(this.assets(), 'javascript');
    },
    'logs': function () {
        return path.join(this.storage(), 'logs');
    },
    'storage': function () {
        return path.join(__dirname, '..', '..', 'storage');
    },
    'pictures': function () {
        return path.join(this.storage(), 'pictures');
    },
    'public': function () {
        return path.join(__dirname, '..', '..', 'public');
    },
    'sass': function () {
        return path.join(this.assets(), 'sass');
    },
    'trash': function () {
        return path.join(this.storage(), 'trash');
    }
};
