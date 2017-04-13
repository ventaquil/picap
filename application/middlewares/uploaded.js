'use strict';

module.exports = function (req, res, next) {
    if (!req.session.uploaded) {
        req.session.uploaded = [];
    }

    next();
};
