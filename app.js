
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('./config/passport');

//Import sequilize connetction to db
const {sequelize} = require('./models')

var indexRouter = require('./routes/index.js');
var animalsRouter = require('./routes/animals');
var speciesRouter = require('./routes/species');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for session
app.use(session({
  secret: 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false} // can be set to true if using https, but we'll be using http
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Have to make user avaliable in all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//Test database connection at startup
sequelize.authenticate().then(() => { // NTS: .then() + catch, works almost identicaly to async() + await.
  console.log('✅ Database connected successfully');
}).catch(err => {
  console.error('❎ Database not connected', err);
}); // Bug fix: forgot to add catch() for error handling, which caused unhandled promise rejection when db connection failed.

app.use('/', indexRouter);
app.use('/animals', animalsRouter);
app.use('/species', speciesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

