const bcrypt = require( 'bcrypt' );
const authorization = require( '../middlewares/authorization' );

const { responses } = require( '../utils/constants' );

const DEFAULT_LOGIN_WAIT_TIME = 60 * 3 * 1000;
const MAX_LOGIN_ATTEMPTS = 4;

const userModel = require( '../models/user' );

module.exports = class UserService{
    authenticate = async ( email, password )=>{
        try {            
            let user = await userModel.findOne({ where: {email: email }});            
            
            if( !user ) {                
                return {            
                    message: responses.USER_NOT_FOUND,
                    content: null
                };        
            }
            
            let now = new Date();
            
            if( user.loginWaitTime > now)
            return {
                message: responses.USER_IN_WAIT_TIME,
                content: {
                    'username': user.username,
                    'email': user.email
                }  
            };            

            let passwordMatches =  await bcrypt.compare( password, user.password);            
            if( !passwordMatches ){
                if( user.loginAttempts >= MAX_LOGIN_ATTEMPTS ){
                    user.loginWaitTime = new Date( Date.now() + DEFAULT_LOGIN_WAIT_TIME );
                    user.loginAttempts = 0;
                    await user.save();                
                }
                else{
                    await user.increment({ 'loginAttempts' : 1 });  
                }
                
                return {
                    message: responses.PASSWORD_MISMATCH,
                    content: null
                };     
            }
            
            let payload = {
                'id': user.id,
                'username': user.username,
                'accessLevel': user.accessLevel,            
            }       
            
            user.loginAttempts = 0;
            user.refreshToken =  authorization.generateRefreshToken( payload );
            await user.save(); 

            return {
                message: responses.USER_AUTHENTICATED,
                content : {
                    'id': user.id,
                    'username': user.username,
                    'accessLevel': user.accessLevel,
                }      
            };            
        }
        catch( error ){
            throw error;
        }        
    };

    getById = async ( id )=>{
        try {
            let user =  await userModel.findByPk( id );
            if( !user ) return { message: responses.USER_NOT_FOUND, content: null }; 
             
            return { message: responses.USER_LOADED, content: user }          
        } catch (error) {
            throw error;
        }
    };

    update = async( id, data )=>{
        try {            
            let user = await userModel.findByPk( id );
            if( !user ) return { message: responses.USER_NOT_FOUND, content: null };

            let columns = [ 'firstname', 'lastname', 'picture', 'birthdate', 'refreshToken' ];
            let updatedCols = 0;
            for( let column of columns ){
                if( data[column] !== undefined ){
                    user[column] = data[column];
                    updatedCols++;
                }                    
            }
            if( updatedCols > 0 ){ 
                await user.save();
                return { message: responses.USER_UPDATED, content: user };
            }
            return {message: responses.USER_NOT_MODIFIED, content: user };
        } catch (error) {
            throw error;
        }        
    };

    updateAccessToken = async ( id, oldToken ) => {
        try {
            let user =  await userModel.findByPk( id );            
            if( !user ) return { message: responses.USER_NOT_FOUND, content: null }  
            
            let payload = {
                id: user.id,
                username: user.username,
                accessLevel: user.accessLevel,            
            };

            let accessToken = authorization.updateAccessToken( oldToken, user.refreshToken, payload );
            return { message: responses.ACCESS_TOKEN_GENERATED, content: accessToken };

        } catch ( error ) {
            throw error;
        }
    };

    generateCredential = async(id, username, accessLevel ) => {
        try {
            let invalidPayload = [ id, username, accessLevel ].some( item => {
                return item === null || item === undefined || item === ""; 
            });
    
            if( invalidPayload )
                throw new Error('Invalid payload values.')
            
            let payload = { id, username, accessLevel }
            let accessToken = authorization.generateAccessToken( payload );
            return accessToken ;

        } catch (error) {
            throw error;
        }
    }
}
