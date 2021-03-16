const jwt = require( 'jsonwebtoken' );
const { httpStatusCodes, responses } = require( '../utils/constants');

const { UNAUTHORIZED } = httpStatusCodes;

const generateAccessToken = ( payload )=>{
    return jwt.sign( payload, process.env.ACCESS_TOKEN_SECRET || 'ACCESS SECRET', { expiresIn : '20m' });
};

const generateRefreshToken = ( payload ) => {
    return jwt.sign( payload, process.env.REFRESH_TOKEN_SECRET || 'REFRESH SECRET', { expiresIn: '7d' });
};

const updateAccessToken = ( oldToken, refreshToken, payload )=>{
    try {                
        clearAccessToken( oldToken );      
        const decoded = jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET || 'REFRESH SECRET' );

        if( decoded.id !== payload.id || decoded.accessLevel !== payload.accessLevel)
            throw new Error( 'invalid refresh token!');
        
        let accessToken = generateAccessToken( payload );        
        return accessToken;        
    } catch (error) {
        throw error;
    }
};

const verifyAuthorization = ( req, res, next )=>{    
    const token = req.header('Authorization')?.split(' ')[1];
    try {
        if( !token ) return res.status( UNAUTHORIZED ).json({ message: responses.NO_TOKEN_PROVIDED, content: null });
        const decoded = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET || 'ACCESS SECRET' );
        req.credentials = { };
        req.credentials.id = decoded.id;
        req.credentials.username = decoded.username;
        req.credentials.accessLevel = decoded.accessLevel;        
        
        return next();

    } catch ( error ) {        
        return res.status( UNAUTHORIZED ).json({ message: `Error! => ${ error.name }`, content: error.stack});        
    }
};

// const checkAdminPassport = ( req, res, next )=>{
//     const id = req.params[userDBcols.id];
//     const token = req.header('Authorization')?.split(' ')[1];
//     try {
//         const decoded = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET || 'ACCESS SECRET' );

//         if(( id !== decoded[USER_ID] ) || ( decoded[ACCESS_LEVEL] !== userAccessLevel.admin ))
//             return res.status( 401 ).json({ message: rmsg.UNAUTHORIZED, content: null });
    
//         res.user = {
//             [USER_ID]: decoded[USER_ID],
//             [USERNAME]: decoded[USERNAME],
//             [ACCESS_LEVEL]: decoded[ACCESS_LEVEL]
//         }
//     return next();

//     } catch ( error ) {
//         console.log( req.path );
//         if( error.name === 'TokenExpiredError' ){
//             return res.redirect(`/users/acesstoken/${ id }?originalUrl=${ req.originalUrl }&method=${ req.method }&expiredToken=${token}`)
//         }
//         return res.status( UNAUTHORIZED ).json({ message: `Error! => ${ error.name }`, content: error.stack});
//     }
// };

// const checkProfessionalPassport = ( req, res, next )=>{    
//     const id = req.params[ps.user.id];
//     const token = req.header('Authorization')?.split(' ')[1];
//     let tokenIndex = tokenWhiteList.findIndex( element => element[userDBcols.id] === id);
    
//     if( tokenIndex < 0 || tokenWhiteList[tokenIndex].token !== token )    
//         return res.status( 401 ).json({ message: rmsg.UNAUTHORIZED, content: null });
    
//     try {
//     const decoded = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET || 'ACCESS SECRET' );

//     if(( id !== decoded[userDBcols.id] ) || ( decoded[userDBcols.accessLevel] !== userAccessLevel.professional ))
//         return res.status( 401 ).json({ message: rmsg.UNAUTHORIZED, content: null });    

//     //res.header( 'Authorization', `Bearer ${ token }`)
//     res.user = {
//         [userDBcols.id]: decoded[userDBcols.id],
//         [userDBcols.username]: decoded[userDBcols.username],
//         [userDBcols.accessLevel]: decoded[userDBcols.accessLevel]
//     }
//     return next();

//     } catch ( error ) {
//         console.log( req.path );
//         if( error.name === 'TokenExpiredError' ){
//             return res.redirect(`/users/acesstoken/${ id }?originalUrl=${ req.originalUrl }&method=${ req.method }&expiredToken=${token}`)
//         }
//         return res.status( 401 ).json({ message: rmsg.UNAUTHORIZED, content: error });
//     }
// };

// const clearAccessToken = ( userId )=>{
//     let tokenIndex = tokenWhiteList.findIndex( element => element.id === userId )
//     if( tokenIndex < 0 ) throw new Error( 'Invalid Access Token.');
        
//     tokenWhiteList.splice( tokenIndex, 1 );
// };

// const checkAccessLevel = ()=>null;

module.exports = {
    generateAccessToken,
    updateAccessToken,    
    generateRefreshToken,
    verifyAuthorization
}