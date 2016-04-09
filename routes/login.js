/**
 * Created by nathanlynch on 4/9/16.
 */
var express = require('express');
var router = express.Router();
var database = require('../database');
var db = database();


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {
    db.getColumnDataByText("users", "username", "hello");
});

module.exports = router;