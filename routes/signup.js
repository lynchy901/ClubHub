/**
 * Created by nathanlynch on 4/9/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signup');
});

module.exports = router;