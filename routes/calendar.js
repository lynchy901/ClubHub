/**
 * Created by nathanlynch on 4/9/16.
 */

var express = require('express');
var router = express.Router();
var helpers = require('../helpers')();

router.get('/', function(req, res, next) {
    if (helpers.checkSessionExists(req.session)) {
        res.render('calender');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;