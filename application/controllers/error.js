'use strict';

module.exports = {
    'code404': function (req, res) {
        res.status(404).render('error/code404', {'title': 'Code 404'});
    }
};
