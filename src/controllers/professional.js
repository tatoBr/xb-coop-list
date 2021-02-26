const { URL } = require( 'url' );
const Services = require( '../services/professional' );
const { responseMessages : messages, responseMessages } = require( '../utils/variables' );

const services = new Services();

module.exports = {
    post: async ( req, res ) => {
        let save = await services.save( req.body );        
        
        switch ( save.message ) {
            case responseMessages.USER_SAVED:
                res.status( 200 )
                break;
            case responseMessages.USER_ALREADY_EXIST:
                res.status( 400 )
                break;
            default:
                res.status( 500 )
                break;
        }
        
        res.json( save );
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