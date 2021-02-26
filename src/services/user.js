const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const model = require( '../models/user' );
const authorization = require( '../utils/authorization' );
const { professionalStructure : {user : us }, responseMessages } = require( '../utils/variables' );

const LOGIN_WAIT_TIME = 60 * 3 * 1000;
const MAX_LOGIN_ATTEMPTS = 4;

module.exports = {
    authenticate: async ( email, password )=>{
        try {            
            let user = await model.findOne(
                { where: {[ us.email ]: email },
                attributes: [ us.id, us.username, us.email, us.password, us.loginAttempts, us.loginWaitTime, us.accessLevel ]
            });            
            
            if( !user ) {                
                return {            
                    message: responseMessages.USER_NOT_FOUND,
                    content: null
                };        
            }
            
            let now = new Date();
            
            if( user[us.loginWaitTime] > now)
            return {
                message: responseMessages.USER_IN_WAIT_TIME,
                content: {
                    [us.username]: user[us.username],
                    [us.email]: user[us.email]
                }  
            };            

            let passwordMatches =  await bcrypt.compare( password, user[us.password]);
            
            if( !passwordMatches ){
                if( user[us.loginAttempts] >= MAX_LOGIN_ATTEMPTS ){
                    user[us.loginWaitTime] = new Date( Date.now() + LOGIN_WAIT_TIME );
                    user[us.loginAttempts] = 0;
                    await user.save();                
                }
                else{
                    await user.increment({[ us.loginAttempts ]: 1 });  
                }
                
                return {
                    message: responseMessages.PASSWORD_MISMATCH,
                    content: null
                };     
            }
            
            let payload = {
                [us.id]: user[us.id],
                [us.username]: user[us.username],
                [us.accessLevel]: user[us.accessLevel],            
            }       
            
            user[us.loginAttempts] = 0;
            user[us.refreshToken] =  authorization.generateRefreshToken( payload );
            await user.save();
            
            let accessToken = authorization.generateAccessToken( payload );
            return {
                message: responseMessages.USER_AUTHENTICATED,
                content:{
                    userId: user[us.id],
                    accessToken
                }
            };
            
        }
        catch( error ){
            console.error( error );
            return {
                message: error.message,
                content: error
            }
        }        
    }
}