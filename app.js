var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var mongoose = require('mongoose');
var Promise = require('bluebird');

var options = {
  server: {
    socketOptions: {
      keepAlive: 300000, connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000, connectTimeoutMS : 30000
    }
  }
};

var index = require('./routes/index');
var api = require('./routes/api');

var usersData = require('./models/users-data-schema');

var app = express();

passport.use(new LocalStrategy(usersData.authenticate()));
passport.serializeUser(usersData.serializeUser());
passport.deserializeUser(usersData.deserializeUser());

// mongoose configuration
mongoose.connect(process.env.MONGODB_URI, options);
mongoose.Promise = Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false
}));

// passport configuration
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
