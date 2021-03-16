const AdminServices = require('../services/admin');
const adminServices = new AdminServices();

const UserServices = require( '../services/user' );
const userServices = new UserServices()

const ProfessionalServices = require( '../services/professional' );
const professionalServices = new ProfessionalServices();

const { responses, httpStatusCodes, userAccessLevel:{ admin: ADMINISTRATOR }} = require( '../utils/constants' );

const { OK, CREATED, NO_CONTENT, NOT_MODIFIED, NOT_FOUND, UNAUTHORIZED, CONFLICT, INTERNAL_SERVER_ERROR } = httpStatusCodes;

const { modelMapper, filterQueryParams } = require( '../utils/helpers');

module.exports = {
    post: async( req, res )=>{                
        let { id, accessLevel } = req.credentials;
        if( accessLevel !== ADMINISTRATOR )
            return res.status( UNAUTHORIZED ).json({ message: responses.UNAUTHORIZED, content: null });

        try {
            const createResult = await adminServices.create( req.body );
            switch ( createResult.message ) {
                case responses.USER_SAVED:
                    res.status( CREATED );
                    break;
                
                case responses.USER_ALREADY_EXIST:
                    res.status( CONFLICT );
                    break;
            
                default:
                    throw new Error( 'Unexpected Response Message.');
            }

            let content = modelMapper( createResult.content,[ 'id', 'username', 'email', 'picture', 'cpf' ]);
            let message = createResult.message;
            return res.json({ message, content });            
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },

    get: async( req, res ) => {        
        let { id, accessLevel, username } = req.credentials;
        if( accessLevel !== ADMINISTRATOR )
            return res.status( UNAUTHORIZED ).json({ message: responses.UNAUTHORIZED, content: null });

        try {
            const readResult = await adminServices.readById( id );
            switch ( readResult.message ) {
                case responses.USER_LOADED:
                        res.status( OK )
                    break;
                case responses.USER_NOT_FOUND:
                    res.status( NOT_FOUND )                    
                break;                
                default:
                    throw new Error( 'Unexpected Response Message.');
            }
            let message = readResult.message;
            let content = modelMapper( readResult.content, [ 'id', 'username', 'email', 'picture', 'firstname', 'lastname', 'birthdate' ])
            return res.json({ message, content });
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },

    patch: async( req, res ) => {
        let { id, accessLevel } = req.credentials;
        let data = req.body;

        if( accessLevel !== ADMINISTRATOR )
            return res.status( UNAUTHORIZED ).json({ message: responses.UNAUTHORIZED, content: null });

        try {
            const updateResult = await adminServices.update( id, data );
            switch ( updateResult.message ) {
                case responses.USER_UPDATED:
                    res.status( OK );
                    break;
                case responses.USER_NOT_MODIFIED:
                    res.status( NOT_MODIFIED );
                    break;
                case responses.USER_NOT_FOUND:
                    res.status( NOT_FOUND );
                    break;
                default:
                    throw new Error( 'Unexpected Response Message.');
            }
            let message = updateResult.message;
            let content = modelMapper( updateResult.content, [ 'id', 'username', 'picture', 'firstname', 'lastname', 'birthdate' ]);
            res.json({message, content});
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },

    delete: async( req, res )=>{
        let { accessLevel } = req.credentials;
        let { email, password } = req.body;

        if( accessLevel !== ADMINISTRATOR )
            return res.status( UNAUTHORIZED ).json({ message: responses.UNAUTHORIZED, content: null });

        try {
            let authResult = await userServices.authenticate( email, password );

            if( authResult.message === responses.USER_AUTHENTICATED ){
                let deleteResult = await adminServices.delete( authResult.content.id );
                switch ( deleteResult.message ) {
                    case responses.USER_DELETED:
                        res.status( OK );
                        break;
                    case res.USER_NOT_FOUND:
                        res.status( NOT_FOUND );
                        break;                
                    default:
                        throw new Error( 'Unexpected Response Message.');
                }
                let message = deleteResult.message;
                let content = modelMapper( deleteResult.content, [ 'id', 'username', 'email' ]);
                
                return res.json({ message, content });            
            } 

            return res.status( NOT_FOUND ).json({ authentication: authResult })      
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },

    postProfessional: async( req, res )=>{
        let { id, accessLevel } = req.credentials;
        if( accessLevel !== ADMINISTRATOR )
            return res.status( UNAUTHORIZED ).json({ message: responses.UNAUTHORIZED, content: null });
        
        try {
            let createResult = await professionalServices.create(req.body);
        
            switch (createResult.message) {
                case responses.USER_SAVED:{
                    let user = modelMapper( createResult.content.user, [ 'id', 'username', 'email', 'picture', 'firstname', 'lastname', 'birthdate' ]);
                    let professional = modelMapper( createResult.content,[ 'actuantionFields', 'skills', 'status' ]);

                    let message = createResult.message;
                    let content = { ...user, ...professional };

                    return res.status( CREATED ).json({ message, content });                    
                }
                case responses.USER_ALREADY_EXIST:{

                    let message = createResult.message;
                    let content = modelMapper( createResult.content.user, [ 'username', 'email', 'cpf' ]);

                    return res.status( CONFLICT ).json({ message, content });                    
                }
                default:{
                    throw new Error( 'Unexpected Response Message.');                    
                }
            } 
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },

    getProfessionals: async( req, res )=>{
        let { id, accessLevel } = req.credentials;
        if( accessLevel !== ADMINISTRATOR )
            return res.status( UNAUTHORIZED ).json({ message: responses.UNAUTHORIZED, content: null });

        let userMapperFilter = []
        let adressMapperFilter = [];
        let phoneMapperFilter = []
        let socialmediaMapperFilter = [];
        let profMapperFilter = [];       
        
        let page = parseInt(req.query?.page);
        let limit = parseInt(req.query?.limit);
        if( page ) delete req.query.page;
        if( limit ) delete req.query.limit;

        if( req.query && Object.keys(req.query).length > 0 && req.query.constructor === Object ){
            let userProperties = Object.values(modelsStructure.user)
            let adressProperties = Object.values(modelsStructure.adress)
            let phonelistProperties = Object.values(modelsStructure.phonelist)
            let socialMediaProperties = Object.values(modelsStructure.socialmediaList)
            let profProperties = Object.values(modelsStructure.professional)

            userMapperFilter = filterQueryParams( req.query, userProperties );
            adressMapperFilter = filterQueryParams( req.query, adressProperties );
            phoneMapperFilter = filterQueryParams( req.query, phonelistProperties );
            socialmediaMapperFilter = filterQueryParams( req.query, socialMediaProperties );
            profMapperFilter = filterQueryParams( req.query,profProperties );
        } 
        else{
            userMapperFilter = [ 'id', 'username', 'email', 'firstname', 'lastname' ]
            adressMapperFilter = [];
            phoneMapperFilter = [ 'whatsapp' ]
            socialmediaMapperFilter = [];
            profMapperFilter = [ 'actuantionFields', 'skills', 'status' ]
        };

        try {
            let readResult = await professionalServices.read()
            switch ( readResult.message ) {
                case responses.USERS_LOADED:{                    
                    let message = readResult.message;
                    let content = readResult.content.map( element => {
                        let user = modelMapper( element.user, userMapperFilter );
                        let adress = modelMapper( element.user.adress, adressMapperFilter );
                        let phonelist = modelMapper( element.user.phonelist, phoneMapperFilter );
                        let socialmedia = modelMapper( element.user.socialmediaCatalog, socialmediaMapperFilter );
                        let professional = modelMapper( element, profMapperFilter );

                        return { ...user, ...adress, ...phonelist, ...socialmedia, ...professional };
                    });

                    if( page && limit ){
                        let paginated;
    
                        let startIndex = (page - 1) * limit;
                        let endIndex = startIndex + limit;
                        let lastIndex = content.length - 1;

                        if (startIndex > lastIndex || limit > content.length ) paginated = [ ...content ]
                        else if (endIndex > lastIndex) paginated = content.slice( startIndex )
                        else paginated = content.slice( startIndex, endIndex);

                        content = paginated
                    }
                    return res.status( OK ).json({ message, content });                    
                }
                case responses.NO_USER_TO_LOAD:{
                    return res.status( NO_CONTENT ).json( readResult );                    
                }
                default:
                    throw new Error( 'Unexpected Response Message.');
            };                                
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },

    getProfessionalById: async( req, res )=>{
        let { accessLevel } = req.credentials;
        if( accessLevel !== ADMINISTRATOR )
            return res.status( UNAUTHORIZED ).json({ message: responses.UNAUTHORIZED, content: null });

        let userMapperFilter = []
        let adressMapperFilter = [];
        let phoneMapperFilter = []
        let socialmediaMapperFilter = [];
        let profMapperFilter = [];       
        
        
        if( req.query && Object.keys(req.query).length > 0 && req.query.constructor === Object ){
            let userProperties = Object.values(modelsStructure.user)
            let adressProperties = Object.values(modelsStructure.adress)
            let phonelistProperties = Object.values(modelsStructure.phonelist)
            let socialMediaProperties = Object.values(modelsStructure.socialmediaList)
            let profProperties = Object.values(modelsStructure.professional)

            userMapperFilter = filterQueryParams( req.query, userProperties );
            adressMapperFilter = filterQueryParams( req.query, adressProperties );
            phoneMapperFilter = filterQueryParams( req.query, phonelistProperties );
            socialmediaMapperFilter = filterQueryParams( req.query, socialMediaProperties );
            profMapperFilter = filterQueryParams( req.query,profProperties );
        } 
        else{
            userMapperFilter = [ 'id', 'username', 'email', 'firstname', 'lastname' ]
            adressMapperFilter = [];
            phoneMapperFilter = [ 'whatsapp' ]
            socialmediaMapperFilter = [];
            profMapperFilter = [ 'actuationFields', 'Skills', 'status' ]
        };
        try {            
            let { id } = req.params;
            let readResult = await professionalServices.readById( id );

            switch (readResult.message) {
                case responses.USER_LOADED:{
                    let user = modelMapper( readResult.content.user, userMapperFilter );
                    let adress = modelMapper( readResult.content.user.adress, adressMapperFilter );
                    let phonelist = modelMapper( readResult.content.user.phonelist, phoneMapperFilter );
                    let socialmedia = modelMapper( readResult.content.user.socialmediaCatalog, socialmediaMapperFilter );
                    let professional = modelMapper( readResult.content, profMapperFilter );
                    
                    let message = readResult.message;
                    let content = { ...user, ...adress, ...phonelist, ...socialmedia, ...professional };
                    return res.status( OK ).json({ message, content });                    
                }
                    
                case responses.USER_NOT_FOUND:
                    res.status( NOT_FOUND ).json({ message: readResult.message, content: null });
                    break;
                        
                default:
                    throw new Error( 'Unexpected Response Message.');
            }
            res.json( readResult );
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },

    patchProfessional: async( req, res )=>{
        let { accessLevel } = req.credentials;
        if( accessLevel !== ADMINISTRATOR )
            return res.status( UNAUTHORIZED ).json({ message: responses.UNAUTHORIZED, content: null });
            
        try {
            let { id } = req.params;
            let updateResult = await professionalServices.update(id, req.body );        
            switch (updateResult.message ) {
                case responses.USER_NOT_FOUND:{

                    return res.status( NOT_FOUND ).json({ message: updateResult.message, content: null }); 
                }

                case responses.USER_UPDATED:{
                    let message = updateResult.message;
                    let content = { ...modelMapper( updateResult.content.user, ['id', 'username', 'email', 'status' ]), status: updateResult.content.status} 
                    return res.status( OK ).json({ message, content });
                }
            
                default:
                    throw new Error( 'Unexpected Response Message.');                    
            }                       
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    },

    deleteProfessional: async( req, res )=>{
        try { 
            let { accessLevel } = req.credentials;
            if( accessLevel !== ADMINISTRATOR )
                return res.status( UNAUTHORIZED ).json({ message: responses.UNAUTHORIZED, content: null });

            let { id } = req.params;          
            let deleteResult = await professionalServices.delete( id );
            switch (deleteResult.message ) {
                case responses.USER_NOT_FOUND:{

                    return res.status( NOT_FOUND ).json({message: deleteResult.message, content: null });
                }

                case responses.USER_DELETED:{
                    let message = deleteResult.message;
                    let content = modelMapper( deleteResult.content.user, [ 'id', 'username', 'email' ]);
                    return res.status( OK ).json({message, content})                
                }                   
            
                default:
                    throw new Error( 'Unexpected Response Message.');
            }
            
        } catch (error) {
            return res.status( INTERNAL_SERVER_ERROR ).json({ message: `Error! => ${ error.name }`, content: error.stack});
        }
    }
}
