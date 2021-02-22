const jwt = require( 'jsonwebtoken' );
const { privateKey } = require('./variables' );

const generateToken = ( payload )=>{
    return jwt.sign( payload, process.env.PRIVATE_KEY || privateKey, { expiresIn : '1h' })
}

const authorize = ( req, res, next )=>{
    const id = req.params.id;
    const token = req.header('Authorization')?.split(' ')[1];

    if( !token ) return res.status( 401 ).json({ message: 'You don\'t have permission to access this resource' });

    try {
        const decoded = jwt.verify( token, process.env.PRIVATE_KEY || privateKey );      
        if( id !== decoded.id ) return res.status( 401 ).json({ message: 'You don\'t have permission to access this resource' });

        req.body.id = decoded.id;
        req.body.name = decoded.name;
        req.body.email = decoded.email

        return next();        
    } catch (error) {
        return res.status( 401 ).json({ message: 'You don\'t have permission to access this resource' });
    }
}

module.exports = {
    generateToken,
    authorize
}