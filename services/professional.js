const Professional = require( '../models/professional' );
const bcrypt = require( 'bcrypt' );

const { generateToken } = require( '../utils/authorization' );
const { professional: pk, responseMessages: messages } = require( '../utils/variables');


module.exports = class ProfessionalServices {
    /**
     * save a new Professional into the database
     * @param { data } data 
     */
    async save( data ){    
        let {
            username, email, cpf, birthdate,
            whatsapp, homePhone, workphone, otherPhones,
            instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse,
            cep, street, adressNumber, complement, district, county, adressState, country,
            actuationFields, skills, experienceLevel,
            portifolioUrl, about, pictureUrl, userPassword
        } = data;
        
        let professional = new Professional(
            username, email, cpf, birthdate,
            whatsapp, homePhone, workphone, otherPhones,
            instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse,
            cep, street, adressNumber, complement, district, county, adressState, country,
            actuationFields, skills, experienceLevel,
            portifolioUrl, about, pictureUrl, userPassword      
        );

        
        const hash = await bcrypt.hash( professional.userPassword, SALTROUNDS );
        professional.userPassword = hash;

        try {    
            let userSaved = await Professional.save( professional );      
            return { message: messages.USER_SAVED, content: userSaved };
        } catch (error) {
            return { message: error.message, content: error };
        };
    };

    /**
     * load a Professional
     * @param { String } professionalId 
     */
    async load( expression, columns, values ){
        try {
            let users = await Professional.load(expression,columns,values);
            if( !users ) return { code: messages.USER_NOT_FOUND, content: null };            
            return { code: messages.USER_LOADED, content: users };
            
        } catch (error) {
            return { message: error.message, content: error };
        }
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
};