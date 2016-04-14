var express = require('express');
var router = express.Router();
var helpers = require('../helpers')();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (helpers.checkSessionExists(req.session)) {
    res.render('index');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
