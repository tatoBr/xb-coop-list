const bcrypt = require( 'bcrypt' );
const userModel = require( '../models/user' );
const authorization = require( '../middlewares/authorization' );

const { responses } = require( '../utils/constants' )
const { modelsStructure } = require( '../utils/constants' );

const { USER_ID, USERNAME, EMAIL, PICTURE, FIRSTNAME, LASTNAME, BIRTHDATE, CPF, PASSWORD, LOGIN_WAIT_TIME, LOGIN_ATTEMPTS, ACCESS_LEVEL, REFRESH_TOKEN} = modelsStructure.user;

const DEFAULT_LOGIN_WAIT_TIME = 60 * 3 * 1000;
const MAX_LOGIN_ATTEMPTS = 4;

module.exports = class UserService{
    authenticate = async ( email, password )=>{
        try {            
            let user = await userModel.findOne({ where: {[EMAIL]: email }});            
            
            if( !user ) {                
                return {            
                    message: responses.USER_NOT_FOUND,
                    content: null
                };        
            }
            
            let now = new Date();
            
            if( user[LOGIN_WAIT_TIME] > now)
            return {
                message: responses.USER_IN_WAIT_TIME,
                content: {
                    [ USERNAME ]: user[ USERNAME ],
                    [ EMAIL ]: user[ EMAIL ]
                }  
            };            

            let passwordMatches =  await bcrypt.compare( password, user[PASSWORD]);            
            if( !passwordMatches ){
                if( user[ LOGIN_ATTEMPTS ] >= MAX_LOGIN_ATTEMPTS ){
                    user[ LOGIN_WAIT_TIME ] = new Date( Date.now() + DEFAULT_LOGIN_WAIT_TIME );
                    user[ LOGIN_ATTEMPTS ] = 0;
                    await user.save();                
                }
                else{
                    await user.increment({[ LOGIN_ATTEMPTS ]: 1 });  
                }
                
                return {
                    message: responses.PASSWORD_MISMATCH,
                    content: null
                };     
            }
            
            let payload = {
                [USER_ID]: user[USER_ID],
                [USERNAME]: user[USERNAME],
                [ACCESS_LEVEL]: user[ACCESS_LEVEL],            
            }       
            
            user[LOGIN_ATTEMPTS] = 0;
            user[REFRESH_TOKEN] =  authorization.generateRefreshToken( payload );
            await user.save(); 

            return {
                message: responses.USER_AUTHENTICATED,
                content : {
                    [USER_ID]: user[USER_ID],
                    [USERNAME]: user[USERNAME],
                    [ACCESS_LEVEL]: user[ACCESS_LEVEL],
                }      
            };            
        }
        catch( error ){
            throw error;
        }        
    };

    getById = async ( id, attributes )=>{
        try {
            let user =  await userModel.findByPk( id );
            if( !user ) return { message: responses.USER_NOT_FOUND, content: null }  
            return { message: responses.USER_LOADED, content: user }          
        } catch (error) {
            throw error;
        }
    };

    update = async( id, data )=>{
        try {            
            let user = await userModel.findByPk( id );
            if( !user ) return { message: responses.USER_NOT_FOUND, content: null };

            let columns = [ FIRSTNAME, LASTNAME, PICTURE, BIRTHDATE, REFRESH_TOKEN ];
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
            let user =  await userModel.findByPk( id, { attributes:[ USER_ID, USERNAME, ACCESS_LEVEL, REFRESH_TOKEN ]});            
            if( !user ) return { message: responses.USER_NOT_FOUND, content: null }  
            
            let payload = {
                [USER_ID]: user[USER_ID],
                [USERNAME]: user[USERNAME],
                [ACCESS_LEVEL]: user[ACCESS_LEVEL],            
            };

            let accessToken = authorization.updateAccessToken( oldToken, user[REFRESH_TOKEN], payload );
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
