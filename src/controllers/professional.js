const ProfessionalServices = require('../services/professional');

const { professionalStatus, httpStatusCodes } = require('../utils/constants');
const { responses } = require('../utils/constants');
const { modelMapper } = require( '../utils/helpers' )

const professionalServices = new ProfessionalServices();

const { ACTIVE, INACTIVE, IN_ANALYSIS } = professionalStatus
const { OK, ACCEPTED, CREATED, NOT_FOUND, CONFLICT } = httpStatusCodes;


module.exports = {
    post: async (req, res) => {
        try {
            let createResult = await professionalServices.create(req.body);
        
            switch (createResult.message) {
                case responses.USER_SAVED:{
                    let message = createResult.message;
                    let content = modelMapper( createResult.content.user, [ USER_ID, USERNAME, EMAIL ]);
                    return res.status( CREATED ).json({ message, content });
                    
                }
                case responses.USER_ALREADY_EXIST:{
                    let message = createResult.message;
                    let content = modelMapper( createResult.content, [ USERNAME, EMAIL, CPF ]);
                    return res.status( CONFLICT ).json({ message, content });                   
                }
                default:
                    throw new Error( 'Unexpected Response Message.');
            } 
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },
    
    getAll: async (req, res) => {
    try {            
        let readResult = await professionalServices.read();            
        
        switch (readResult.message) {
            case responses.USERS_LOADED:{

                let mappedProfessionals = [];
                let activeProfessionals = [];

                if( Array.isArray( readResult.content )){
                    activeProfessionals = readResult.content.filter( element => element.status === ACTIVE );
                    mappedProfessionals = activeProfessionals.map( mapProfessional );              
                };
                
                let page = parseInt(req.query.page);
                let limit = parseInt(req.query.limit);

                if( !page || !limit ) return res.json({ message: readResult.message, content: readResult.content.map( mapProfessional )});                
               
                let paginated;
                
                let startIndex = (page - 1) * limit;
                let endIndex = startIndex + limit;
                let lastIndex = mappedProfessionals.length - 1;
                
                if (startIndex > lastIndex || limit > mappedProfessionals.length ) paginated = [ ...mappedProfessionals ]
                else if (endIndex > lastIndex) paginated = mappedProfessionals.slice( startIndex )
                else paginated = mappedProfessionals.slice(startIndex, endIndex);
                
                return res.status( OK ).json({ message: readResult.message, content: paginated });
            }                
            
            case responses.NO_USER_TO_LOAD:
            {
                return res.status( OK ).json({ message: readResult.message, content: null });
            }

            default:
                throw new Error( 'Unexpected Response Message.');
            } 
                
        } catch ( error ) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },
            
    get: async ( req, res ) => {
                try {
                    let { id } = req.params;
                    let readResult = await professionalServices.readById( id );
            
                    switch ( readResult.message ) {
                        case responses.USER_LOADED:
                            return res.status( OK ).json({ message: readResult.message, content: mapProfessional(readResult.content)});
                        
                            case responses.USER_NOT_FOUND:
                                return res.status( NOT_FOUND ).json({ message: readResult.message, content: null })

                        default:
                            throw new Error( 'Unexpected Response Message.');                           
                    }           
                            
                } catch (error) {
                    return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
                }
    },

    patch: async (req, res) => {
        try {
            let { id } = req.body.credentials
            let updateResult = await professionalServices.update(id, req.body);
            switch (updateResult.message ) {
                case responses.USER_UPDATED:{
                    return res.status( ACCEPTED ).json({ message: updateResult.message, content: mapProfessional( updateResult.content )})
                }                   
                    
                case responses.USER_NOT_FOUND:{
                    return res.status( NOT_FOUND ).json({ message: updateResult.message, content: null });
                }

                default:
                    throw new Error( 'Unexpected Response Message.');                    
            }                        
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }        
    },

    delete: async (req, res) => {
        try {
            const { id } = req.body.credentials;
            let deleteResult = await professionalServices.delete( id );
            switch (deleteResult.message) {
                case responses.USER_DELETED:                    
                    return res.status( OK ).json({ message: deleteResult.message, content: null });                    
                   
                case responses.USER_NOT_FOUND:
                    return res.status( NOT_FOUND ).json({ message: deleteResult.message, content: null });
                    
                default:
                    throw new Error( 'Unexpected Response Message.');       
            }     
               
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    }
}

function mapProfessional( professional ){
    return {
        id: professional.id,
        username: professional.user.username,
        status: professional.status
    }
}