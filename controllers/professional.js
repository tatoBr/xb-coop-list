const { body, validationResult } = require( 'express-validator' );
const uuid = require( 'uuid' );
const Services = require( '../services/professional' );
const services = new Services();

module.exports = {
    post: async ( req, res ) => {
        let { 
            name, birthdate, email, phoneList,
            adress, actuationfield, skills, experienceLevel,
            portifolioUrl, socialMedias, about, pictureUrl, password
        } = req.body;
        
        let response = await services.save( req.body );        
        if( response.error ) return res.status( 500 ).json({ response: error.message });
        
        res.status( 201 ).json( response );
    },
    
    login: async( req, res )=>{
        const { email, password } = req.body
        try {
            let response = await services.loginUser( email, password );
            res.status( 200 ).json( response );
            
        } catch (error) {
            res.status( 500 ).json({ message: error.message, content: error });
        }
    },

    logout: async ( req, res )=>{
        try {
            let response = await services.logoutUser();
            res.status( 200 ).json( response );            
        } catch (error) {
            res.status( 500 ).json({ message: error.message, content: error });
        }
    },

    get: async ( req, res )=>{
        let { id } = req.params;
        let response = await services.load( id );

        res.status( 200 ).json( response );
    },

    getAll: async ( req, res )=>{
        let response = await services.loadAll();
        res.status( 200 ).json( response );
    },

    patch: async ( req, res )=>{
        let { id }= req.params;
        let response = await services.update( id, req.body );
        res.status( 202 ).json( response );
    },

    delete: async ( req, res )=>{
        const { id } = req.params;
        let response = await services.delete( id );
        res.status( 200 ).json({ response: 'Cliente Deletado' });
    }
}