const services = require( '../services/user' );
const { professionalStructure: { user : us }, responseMessages } = require( '../utils/variables' )

module.exports = {
    authenticate:async ( req, res, next )=>{
        let { email, password } = req.body;
        let auth = await services.authenticate( email, password );

        switch ( auth.message ) {
            case responseMessages.USER_NOT_FOUND:            
                res.status( 404 );                
                break;

            case responseMessages.USER_IN_WAIT_TIME:
            case responseMessages.PASSWORD_MISMATCH:
                res.status( 401 );
                break;

            case responseMessages.USER_AUTHENTICATED:
                res.status( 200 );
                res.header('Authorization', `Basic ${ auth.content.accessToken }`)
                break;

            default:
                res.status( 500 );
                break;
        }

        res.json({ message: auth.message, content: auth.content });
    }
}