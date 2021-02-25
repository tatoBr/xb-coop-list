const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const sequelize = require( './database/index');

//importing Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const professionalRouter = require( './routes/professional' );

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//using Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use( '/professionals', professionalRouter );

const PORT = process.env.PORT || 3000

sequelize.authenticate()
.then( result =>{
    sequelize.sync({})
    .then( result =>{
        app.listen( PORT, console.log( 'Server Listening on port ' + PORT ));
    })
    .catch();
})
.catch( error => console.error( error ));

