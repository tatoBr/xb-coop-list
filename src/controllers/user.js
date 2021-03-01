const userServices = require( '../services/user' );
const { professionalStructure: { user : us }, responseMessages } = require( '../utils/variables' )
const { modelsStructure : { user: modelStructure }} = require( '../utils/variables' );
const http = require( 'http' );
const { clearAccessToken } = require('../utils/authorization');


module.exports = {
    authenticate: async( req, res, next )=>{
        let { email, password } = req.body;
        try {
            let authenticationResult = await userServices.authenticate( email, password );
    
            switch ( authenticationResult.message ) {
                case responseMessages.USER_NOT_FOUND:            
                    res.status( 404 );                
                    break;
    
                case responseMessages.USER_IN_WAIT_TIME:
                case responseMessages.PASSWORD_MISMATCH:
                    res.status( 401 );
                    break;
    
                case responseMessages.USER_AUTHENTICATED:
                    res.status( 200 );
                    res.header('Authorization', `Basic ${ authenticationResult.content.accessToken }`)
                    break;
    
                default:
                    res.status( 500 );
                    break;
            }
            return res.json({ message: authenticationResult.message, content: authenticationResult.content });
            
        } catch (error) {
            return res.status( 500 ).json({ message: error.message, content: error });
        }
    },

    logout: async( req, res )=>{
        const id = req.params[modelStructure.id]; 
        try {
            let updateResult = await userServices.update( id, {[modelStructure.refreshToken]:""});

            switch ( updateResult.message ) {
                case responseMessages.USER_UPDATED:
                    clearAccessToken( id );                    
                    res.status( 200 ).json({ message: responseMessages.USER_LOGGED_OUT, content: null });
                    break;
                case responseMessages.USER_NOT_FOUND:
                    res.status( 404 ).json( updateResult );
                    break;
                default:
                    res.status( 500 ).json({ message:'Something went wrong.', content })
                    break;
            }

        } catch (error) {
            return res.status( 500 ).json({ message: error.message, content: error });
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
            return res.status( 500 ).json({ message: error.message, content: error });
        }
    }
}