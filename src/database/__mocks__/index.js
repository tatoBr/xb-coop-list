const SequelizeMock = require('sequelize-mock');
const dbConfig = require( '../../config/database' );
const connection = new SequelizeMock( dbConfig );
connection.transaction = ()=>({
    commit: ()=>{},
    rollback: ()=>{}    
})
module.exports = connection;