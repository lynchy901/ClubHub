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
    var user = req.body.username;
    var result = db.getColumnDataByText("users", "username", user);
    result.then(function(data) {
       res.send(data);
    });
});

module.exports = router;