const jwt = require( 'jsonwebtoken' );
const { privateKey } = require('./variables' );
const { professionalStructure: ps, userAccessLevel } = require( './variables')

const generateAccessToken = ( payload )=>{
    return jwt.sign( payload, process.env.ACCESS_TOKEN_SECRET || 'ACCESS SECRET', { expiresIn : '30m' });
};

const generateRefreshToken = ( payload ) => {
    return jwt.sign( payload, process.env.REFRESH_TOKEN_SECRET || 'REFRESH SECRET', { expiresIn: '7d' });
};

const checkProfessionalPassport = ( req, res, next )=>{    
    const id = req.params[ps.user.id];
    const token = req.header('Authorization')?.split(' ')[1];

    if( !token ) return res.status( 401 ).json({ message: 'You don\'t have permission to access this resource' });

    try {
        const decoded = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET || 'ACCESS SECRET' );      
        if(( id !== decoded[ps.user.id] ) || ( decoded[ps.user.accessLevel] !== userAccessLevel.professional ))
            return res.status( 401 ).json({ message: 'You don\'t have permission to access this resource' });

        req.body[ps.user.id] = decoded[ps.user.id];
        req.body[ps.user.username] = decoded[ps.user.username];
        req.body[ps.user.accessLevel] = decoded[ps.user.accessLevel]; 
        return next();

    } catch (error) {
        return res.status( 401 ).json({ message: 'You don\'t have permission to access this resource' });
    }
}

const checkAccessLevel = ()=>null;

module.exports = {
    generateAccessToken,
    generateRefreshToken,   
    checkProfessionalPassport
}