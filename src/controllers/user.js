const http = require( 'http' );
const { clearAccessToken } = require('../middlewares/authorization');

const { responses } = require( '../utils/constants' )
const { httpStatusCodes } = require( '../utils/constants' );
const { OK, CREATED, ACCEPTED, NO_CONTENT, NOT_MODIFIED, BAD_REQUEST, UNAUTHORIZED, FORBIDEN, NOT_FOUND, CONFLICT, INTERNAL_SERVER_ERROR } = httpStatusCodes

const UserServices = require( '../services/user' );
const userServices = new UserServices();

module.exports = {
    login: async( req, res, next )=>{
        let { email, password } = req.body;
        try {
            let authenticationResult = await userServices.authenticate( email, password );
    
            switch ( authenticationResult.message ) {
                case responses.USER_NOT_FOUND:            
                    res.status( NOT_FOUND );                
                    break;
    
                case responses.USER_IN_WAIT_TIME:
                case responses.PASSWORD_MISMATCH:
                    res.status( UNAUTHORIZED );
                    break;
    
                case responses.USER_AUTHENTICATED:{
                    let user = authenticationResult.content;
                    let accessToken = await userServices.generateCredential( user.id, user.username, user.accessLevel );

                    let message = responses.USER_LOGGED_IN
                    let content = { id: user.id, accessToken } 
                    return res.status( OK ).json({ message, content });                    
                    break;
                }
    
                default:
                    res.status( INTERNAL_SERVER_ERROR );
                    break;
            }
            return res.json({ message: authenticationResult.message, content: authenticationResult.content });
            
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },

    logout: async( req, res )=>{
        const { id } = req.credentials; 
        try {
            let updateResult = await userServices.update( id, { refreshToken:""});

            switch ( updateResult.message ) {
                case responses.USER_UPDATED:
                case responses.USER_NOT_MODIFIED:                                     
                    return res.status( OK ).json({ message: responses.USER_LOGGED_OUT, content: null });
                    
                case responses.USER_NOT_FOUND:
                    return res.status( NOT_FOUND ).json( updateResult );
                    
                default:
                    throw new Error( 'Unexpected Response Message.');                    
            }

        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },

    getAccessToken: async( req, res, next ) => {
        let { id } = req.params;
        let { originalUrl, method, expiredToken } = req.query;
        
        try {
            let result = await userServices.updateAccessToken( id, expiredToken );
            res.header('Authorization', `Basic ${result.content}` );
            
            const options = {
                hostname: req.hostname || 'localhost',
                port: process.env.PORT || 3000,
                path: originalUrl || '/',
                method: method || 'GET',
                headers: {
                    'Content-Type': 'application/json',                    
                    'Authorization': `Basic ${ result.content }`
                }            
            };

            let data = '';
            let request = http.request( options, response => {
                response.on( 'data', chunk =>{
                    data+=chunk;
                });
                response.on('end', ()=> res.send(  data ));                
                response.on('error', error => console.log( error ));                           
            });
            request.on('error', error => console.log( error ))
            request.end();

        } catch (error) {
            return res.status( code.INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    }
}