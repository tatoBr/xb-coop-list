const bcrypt = require( 'bcrypt' );
const ProfessionalServices = require( '../services/professional' );
const { professional : pk, responseMessages: rm } = require( '../utils/variables' );
const { generateToken } = require('../utils/authorization' );

const professionalAuthenticantion = async ( req, res, next )=>{
    let services = new ProfessionalServices();
    let { password, email } = req.body;
    let serviceResponse = await services.load([pk.id, pk.username, pk.email, pk.userPassword],[pk.email],[email]);
    
    switch ( serviceResponse.code ) {
        
        case rm.USER_LOADED:
            try {
                let pwCompareResult = await bcrypt.compare( password, serviceResponse.content.userpassword );
                if( !pwCompareResult ) return res.status(401).json({ message:"Invalid password", content: null });
                
                let payload = {
                    id: serviceResponse.content.id,
                    name: serviceResponse.content.username,
                    email: serviceResponse.content.email
                } 
                let token = generateToken( payload );            
                req.body.token = token;
                req.body.payload = payload;
    
                return next();            
            } catch (error) {
                return res.status( 500 ).json({ message: error.message, content: error });
            }
        case rm.USER_NOT_FOUND:
            return res.status( 400 ).json({ message:"'email not registered in the database'", content: null });
    }
}

module.exports ={  professionalAuthenticantion };