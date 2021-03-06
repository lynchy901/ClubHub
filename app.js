var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');
var home = require('./routes/home');
var calendar = require('./routes/calendar');
var myclubs = require('./routes/myclubs');
var profile = require('./routes/profile');
var search = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 10000 }}));
app.use(extendSession);

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/signup', signup);
app.use('/calendar', calendar);
app.use('/myclubs', myclubs);
app.use('/profile', profile);
app.use('/search', search);
app.use('/home', home);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function extendSession(req, res, next) {
  console.log("middleware");
  if (req.method === 'GET') {
    if (req.session.username) {
      console.log("current session is : " + req.session.username);
      req.session._garbage = Date();
      req.session.touch();
    }
  }
  next();
}


module.exports = app;
