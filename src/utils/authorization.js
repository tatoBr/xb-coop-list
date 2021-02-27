const jwt = require( 'jsonwebtoken' );
const { professionalStructure: ps, userAccessLevel, responseMessages } = require( './variables');
const { modelsStructure: { user: userStructure }} = require( '../utils/variables' );
const tokenWhiteList = [];

const generateAccessToken = ( payload )=>{
    let accessToken = jwt.sign( payload, process.env.ACCESS_TOKEN_SECRET || 'ACCESS SECRET', { expiresIn : '20m' });
    tokenWhiteList.push( accessToken );
    return accessToken;
};

const generateRefreshToken = ( payload ) => {
    return jwt.sign( payload, process.env.REFRESH_TOKEN_SECRET || 'REFRESH SECRET', { expiresIn: '7d' });
};

const updateAccessToken = ( oldToken, refreshToken, payload )=>{
    try {                
        clearAccessToken( oldToken );      
        const decoded = jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET || 'REFRESH SECRET' );

        if( decoded[userStructure.id] !== payload[userStructure.id] || decoded[userStructure.accessLevel] !== payload[userStructure.accessLevel])
            throw new Error( 'invalid refresh token!');
        
        let accessToken = generateAccessToken( payload );        
        return accessToken;        
    } catch (error) {
        throw error;
    }
}

const checkProfessionalPassport = ( req, res, next )=>{    
    const id = req.params[ps.user.id];
    const token = req.header('Authorization')?.split(' ')[1];
    const isOnTheList = tokenWhiteList.includes( token );

    if( !token || !isOnTheList ) return res.status( 401 ).json({ message: responseMessages.UNAUTHORIZED, content: null });    
    
    try {
    const decoded = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET || 'ACCESS SECRET' );

    if(( id !== decoded[ps.user.id] ) || ( decoded[ps.user.accessLevel] !== userAccessLevel.professional ))
        return res.status( 401 ).json({ message: responseMessages.UNAUTHORIZED, content: null });    

    res.header( 'Authorization', `Basic ${ token }`)
    res.user = {
        [userStructure.id]: decoded[userStructure.id],
        [userStructure.username]: decoded[userStructure.username],
        [userStructure.accessLevel]: decoded[userStructure.accessLevel]
    }
    return next();

    } catch ( error ) {
        console.log( req.path );
        if( error.name === 'TokenExpiredError' ){
            return res.redirect(`/users/acesstoken/${ id }?originalUrl=${ req.originalUrl }&method=${ req.method }&expiredToken=${token}`)
        }
        return res.status( 401 ).json({ message: responseMessages.UNAUTHORIZED, content: error });
    }
};

const clearAccessToken = ( token )=>{
    let tokenIndex = tokenWhiteList.indexOf( token )
    if( tokenIndex < 0 ) throw new Error( 'Invalid Access Token.');
        
    tokenWhiteList.splice( tokenIndex, 1 );
};

const checkAccessLevel = ()=>null;

module.exports = {
    generateAccessToken,
    updateAccessToken,
    clearAccessToken,
    generateRefreshToken,   
    checkProfessionalPassport
}