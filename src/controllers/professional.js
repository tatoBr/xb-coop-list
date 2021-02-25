const { URL } = require( 'url' );
const Services = require( '../services/professional' );
const { responseMessages : messages, responseMessages } = require( '../utils/variables' );

const services = new Services();

module.exports = {
    post: async ( req, res ) => {
        let response = await services.save( req.body );        
        if( response.error ) return res.status( 500 ).json({ response: error.message });
        
        res.status( 201 ).json( response );
    },
    
    login: async( req, res )=>{        
        try { 
            let { email, password } = req.body;
            let authentication = await services.authenticate( email, password );
            if( authentication.code === responseMessages.USER_AUTHENTICATED )
                return res.status( 200 ).json( { token: authentication.content });

            res.status(400).send({ code: authentication.code, content: null})
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
        console.log( id )
        let response = await services.loadById( id );

        res.status( 200 ).json( response );
    },

    getAll: async ( req, res )=>{
        let response = await services.loadAll();
        res.status( 200 ).json( response );
    },

    update: async ( req, res )=>{
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