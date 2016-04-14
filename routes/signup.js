/**
 * Created by nathanlynch on 4/9/16.
 */
var express = require('express');
var router = express.Router();
var db = require('../database')();
var bcrypt = require('../helpers')();

router.get('/', function(req, res, next) {
    res.render('signup');
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    //gets username and password from the body of the post request
    var username = req.body.username;
    var password = req.body.password;

    //passHash returns promise with hash of password. 
    //dbRes returns query results for username entered.
    var passHash = bcrypt.encryptString(password);
    var dbRes = db.getColumnDataByText("users", "username", username);

    //do stuff once promises resolve
    passHash.then(function(hash) {
        dbRes.then(function(data) {
            //data is returned usernames. Makes sure the username doesn't exist
            if (data.length <= 0) {
                //passes to a function that inserts account data into table
                var promise = db.createAccount(username, hash);
                promise.then(function(status) {
                    if (status) {
                        res.render('login');
                    } else {
                        console.log("Account not created");
                    }
                });
            } else {
                res.send("Account with this username already exists");
            }
        });
    });
});

module.exports = router;