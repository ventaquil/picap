'use strict';

const path = require('path');

module.exports = {
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
    'trash': function () {
        return path.join(this.storage(), 'trash');
    }
};
