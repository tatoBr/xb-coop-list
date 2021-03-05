const Services = require('../services/admin');
const userServices = require( '../services/user' );
const ProfessionalServices = require( '../services/professional' );
const profServices = new ProfessionalServices();
const { responseMessages : rmsgs } = require( '../utils/variables' );

const adminServices = new Services();

module.exports = {
    create: async( req, res )=>{
        try {
            const serviceResponse = await adminServices.save( req.body );
            switch ( serviceResponse.message ) {
                case rmsgs.USER_SAVED:
                    res.status( 201 );
                    break;
            
                default:
                    res.status( 500 );
                    break;
            }
            return res.json( serviceResponse );            
        } catch (error) {
            res.status( 500 ).json({ message: error.message, content: error });
        }
    },

    read: async( req, res )=>{
        let { id } = req.params;
        try {
            const serviceResponse = await adminServices.readById( id );
            return res.json( serviceResponse );
        } catch (error) {
            res.status( 500 ).json({ message: error.message, content: error });
        }
    },

    update: async( req, res )=>{
        let { id } = req.params;
        let data = req.body;
        try {
            const serviceResponse = await adminServices.update( id, data );
            switch ( serviceResponse.message ) {
                case rmsgs.USER_UPDATED:
                    res.status(200);
                    break;
                case rmsgs.USER_NOT_MODIFIED:
                    res.status( 304 );
                    break;
                case rmsgs.USER_NOT_FOUND:
                    res.status( 404 );
                    break;
                default:
                    res.status( 200 );
                    break;
            }
            res.json( serviceResponse );
        } catch (error) {
            res.status( 500 ).json({ message: error.message, content: error });
        }
    },

    delete: async( req, res )=>{
        let { email, password } = req.body;
        try {
            let authentication = await userServices.authenticate( email, password );

            if( authentication.message === rmsgs.USER_AUTHENTICATED ){
                let deleteResult = await adminServices.delete( authentication.content.userId );
                switch ( deleteResult.message ) {
                    case rmsgs.USER_DELETED:
                        res.status( 200 );
                        break;
                    case rmsgs.USER_NOT_FOUND:
                        res.status( 404 );
                        break;                
                    default:
                        res.status( 200 );
                        break;
                }
                return res.json( deleteResult );            
            } 

            return res.status(404).json({ authentication })      
        } catch (error) {
            return res.status( 500 ).json({ message: error.message, content: error });
        }
    },

    readAllProfessionals: async( req, res )=>{        
        try {
            let professionals = await profServices.loadAll( req.query )
            switch ( professionals.message ) {
                case rmsgs.USERS_LOADED:
                    res.status( 200 );
                    break;
                case rmsgs.NO_USER_TO_LOAD:
                    res.status( 204 );
                    break;
                default:
                    res.status( 500 );
                    break;
            }
            return res.json( professionals );                     
        } catch (error) {
            return res.status( 500 ).json({ message: error.message, content: error });
        }
    },

    readProfessionalById: async( req, res )=>{
        try {            
            let { profId } = req.params;
            let professional = await profServices.loadById( profId, req.query );
            
            switch (professional.message) {
                case rmsgs.USER_LOADED:
                    res.status( 200 );
                    break;
                    
                case rmsgs.USER_NOT_FOUND:
                    res.status( 204 );
                    break;
                        
                default:
                    res.status( 500 );
                    break;
            }
            res.json( professional );
        } catch (error) {
            return res.status( 500 ).json({ message: error.message, content: error });
        }
    },

    updateProfessional: async( req, res )=>{
        try {
            let { profId } = req.params;
            let professional = await profServices.update(profId, req.body );        
            switch (professional.message ) {
                case rmsgs.USER_NOT_FOUND:
                    res.status( 404 )                
                    break;
    
                case rmsgs.USER_UPDATED:
                    res.status( 200 )                
                    break;
            
                default:
                    break;
            }
            res.json( professional );            
        } catch (error) {
            return res.status( 500 ).json({ message: error.message, content: error });
        }
    },

    deleteProfessional: async( req, res )=>{
        try {  
            let { profId } = req.params;          
            let professional = await profServices.delete( profId );
            switch (professional.message ) {
                case rmsgs.USER_NOT_FOUND:
                    res.status( 400 )                
                    break;
    
                case rmsgs.USER_DELETED:
                    res.status( 200 )                
                    break;
            
                default:
                    res.status( 500 );
                    break;
            }
            res.json( professional );
        } catch (error) {
            return res.status( 500 ).json({ message: error.message, content: error });
        }
    }
}