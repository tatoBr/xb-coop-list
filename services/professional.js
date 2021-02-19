const Professional = require( '../models/professional' );

module.exports = class ProfessionalServices {
    /**
     * save a new Professional into the database
     * @param { data } data 
     */
    async save( data ){    
        let {
            name, email, cpf, birthdate,
            whatsapp, homePhone, workphone, otherPhones = [],
            instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse,
            cep, street, number, complement, district, county, state, country,
            actuationFields, skills, experienceLevel,
            portifolioUrl, about, pictureUrl, password
        } = data;
        
        let professional = new Professional(
            name, email, cpf, birthdate,
            whatsapp, homePhone, workphone, otherPhones = [],
            instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse,
            cep, street, number, complement, district, county, state, country,
            actuationFields, skills, experienceLevel,
            portifolioUrl, about, pictureUrl, password      
        );

        try {
            await Professional.save( professional );              
            return { message: 'Professional Saved', content: professional };
                     
        } catch (error) {
            return { message: error.message, content: error };
        };
    };

    /**
     * load a Professional by id
     * @param { String } professionalId 
     */
    async load( professionalId ){
        /**ToDo*/
        console.log( 'Load a Professional by Id' );
        return {
                message: 'Loaded successfuly',
                content: {}
        };
    };

    /**Load all Professionals from the database
     * @returns { ProfessionalModel[] } a list of professionals
    */
    async loadAll(){
        /** ToDo */
        return {
            message: 'Load All Professionals Successfully',
            content: ['list', 'of', 'professionals']
        };
    };

    /**
     * Upadate a Professional data and save into the databa
     * @param { String } professionalId 
     * @param { Object } data
     * @returns { ProfessionalModel } updated professional
     */
    async update( professionalId, data ){
        /**ToDo */
        return {
            message: "Professional updated successfully.",
            content: {}
        };
    };

    /**
     * Delete a Professional from the database
     * @param { String } professionalId
     * @returns { Professional } deleted professional
    */
    async delete( professionalId ){
        /**ToDo */
        return {
            message: 'Professional deleted.',
            content: {}
        }; 
    };

    async loginUser( email, password ){
        try {
            return {
                message: 'User logged in',
                content: {}
            };            
        } catch ( error ) {
            return {
                message: error.message,
                content: error
            };
        };
    };

    async logoutUser(){
        return {
            message: 'User logged out',
            content: {}
        };
    };
};