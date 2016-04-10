/**
 * Created by nathanlynch on 4/9/16.
 */
var express = require('express');
var router = express.Router();
var db = require('../database')();

router.get('/', function(req, res, next) {
    res.render('signup');
});

router.post('/', function(req, res, next) {
    var user = req.body.username;
    db.getColumnDataByText("users", "username", user).then(function(data) {
       if (data.length > 0) {
           
       } else {
           res.send(data);
       }
    });
});

module.exports = router;