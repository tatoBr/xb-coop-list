const { body, validationResult } = require( 'express-validator' );
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

    get: async ( req, res )=>{
        let { id } = req.params;
        res.status( 200 ).json( req.id );
    },

    getAll: async ( req, res )=>{
        res.status( 200 ).json( { response: ['Professional', 'List' ]});
    },

    patch: async ( req, res )=>{
        const { id } = req.params;
        res.status( 202 ).jsos( { response: 'Cliente Atualizado' });
    },

    delete: async ( req, res )=>{
        const { id } = req.params;
        res.status( 200 ).json({ response: 'Cliente Deletado' });
    }
}