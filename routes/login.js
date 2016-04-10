/**
 * Created by nathanlynch on 4/9/16.
 */
var express = require('express');
var router = express.Router();
var database = require('../database');
var db = database();
var Bcrypt = require('bcrypt');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {
    //grab username and password from body
    var user = req.body.username;
    var password = req.body.password;

    //searches for data in users table by username
    var result = db.getColumnDataByText("users", "username", user);

    //when promise resolves, do stuff
    result.then(function(data) {
        var error = "Username or Password is incorrect";
        //make sure username exists
        if (data.length > 0) {
            //make sure username entered by user equals username from db
            if (user == data[0].username) {
                //hash password and compare with hash from db
                Bcrypt.compare(password, data[0].password, function(err, resp) {
                    if (!err) {
                        if (resp == true) {
                            res.render('home');
                        } else {
                            res.send("Incorrect username or password");
                        }
                    } else {
                        console.log(err);
                    }
                });
            }
        }
    });
});

module.exports = router;