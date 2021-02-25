var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Adress = require('./models/adress')

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
app.use(express.static(path.join(__dirname, 'public')));

//using Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use( '/professionals', professionalRouter );
app.post( '/testes', async( req, res )=>{
     let { cep, street, number, complement, district, county, state, country } = req.body;
     try {
         let adress = await Adress.create( cep, street, number, complement, district, county, state, country );
         res.json({ result: adress})
         
     } catch (error) {
         res.json({error: error.message})
     }
});

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

