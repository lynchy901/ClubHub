/**
 * Created by nathanlynch on 4/9/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login');
});

module.exports = router;