require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var mongoose = require('mongoose');
var Promise = require('bluebird');

var index = require('./routes/index');
var api = require('./routes/api');
var admin = require('./routes/admin');

var app = express();

// browserSync setup
if ( process.env.NODE_ENV != 'production' ) {
  var browserSync = require('browser-sync');
  browserSync({
    files: ['./**/*'],
    online: false,
    port: 9000,
    proxy: 'localhost:3000',
    ui: false
  });
}

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// session configuration
app.use(cookieSession({
  secret: process.env.SESSION_SECRET,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// passport configuration
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', index);
app.use('/api', api);
app.use('/', admin);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('index',{
      title: 'Chat App | Page not found'
    });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Page Not Found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Page Not Found');
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
