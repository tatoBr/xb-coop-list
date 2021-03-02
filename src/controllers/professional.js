const Services = require('../services/professional');
const { responseMessages: messages, responseMessages } = require('../utils/variables');

const services = new Services();

module.exports = {
    post: async (req, res) => {
        try {            
            let save = await services.save(req.body);
        
            switch (save.message) {
                case responseMessages.USER_SAVED:
                    res.status(201)
                    break;
                case responseMessages.USER_ALREADY_EXIST:
                    res.status(409)
                    break;
                default:
                    res.status(500)
                    break;
            }        
            return res.json(save);
        } catch (error) {
            return res.status( 500 ).json( error );
        }
    },

    get: async (req, res) => {
        try {
            let { userId } = req.params;
            let loadResult = await services.loadById(userId);
    
            switch ( loadResult.message ) {
                case responseMessages.USER_LOADED:
                    res.status(200);
                    break;
    
                default:
                    res.status(500)
                    break;
            }
    
            return res.json( loadResult );            
        } catch (error) {
            return res.status( 500 ).json( error );
        }
    },

    getAll: async (req, res) => {
        try {            
            let loadResult = await services.loadAll();

            switch (loadResult.message) {
                case responseMessages.USERS_LOADED:
                    res.status( 200 )
                    break;
            
                default:
                    res.status( 500 )
                    break;
            }

            if( loadResult.content === null ) return res.json( loadResult );
    
            let page = parseInt(req.query.page);
            let limit = parseInt(req.query.limit);
            if( !page || !limit ) return res.json( loadResult );
                   
            let professionals = loadResult.content;
            let paginated;
    
            let startIndex = (page - 1) * limit;
            let endIndex = startIndex + limit;
            let lastIndex = professionals.length - 1;
    
            if (startIndex > lastIndex || limit > professionals.length ) paginated = [ ...professionals ]
            else if (endIndex > lastIndex) paginated = professionals.slice( startIndex )
            else paginated = professionals.slice(startIndex, endIndex);
            
            return res.json( { message: loadResult.message, content: paginated });

        } catch (error) {
            return res.status( 500 ).json( error );
        }
    },

    update: async (req, res) => {
        let { id } = req.params;
        let response = await services.update(id, req.body);
        res.status(202).json(response);
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            let response = await services.delete( id );       
            res.status(200).json( response );            
        } catch (error) {
            return res.status( 500 ).json( error );
        }
    }
}