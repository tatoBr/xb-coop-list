var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//importing Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const professionalRouter = require( './routes/professional' );

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//using Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use( '/professionals', professionalRouter );

module.exports = app;
