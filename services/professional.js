const Professional = require( '../models/professional' );

module.exports = class ProfessionalServices {
    /**
     * save a new Professional into the database
     * @param { Professional } professional 
     */
    async save( data ){
        /**ToDo*/    
        let {
            name, email, cpf, birthdate,
            whatsapp, homePhone, workphone, otherPhones = [],
            instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse,
            cep, street, number, complement, district, county, state, country,
            actuationfield, skills, experienceLevel,
            portifolioUrl, about, pictureUrl, password
        } = data;
        
        let professional = new Professional(
            name, email, cpf, birthdate,
            whatsapp, homePhone, workphone, otherPhones = [],
            instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse,
            cep, street, number, complement, district, county, state, country,
            actuationfield, skills, experienceLevel,
            portifolioUrl, about, pictureUrl, password      
        );

        try {
            await professional.save();              
            return { message: 'Professional Saved', content: professional };
                     
        } catch (error) {
            return { message: error.message, content: error };
        }
    }

    /**
     * load a Professional by id
     * @param { String } professionalId 
     */
    load( professionalId ){
        /**ToDo*/
        console.log( 'Load a Professional by Id' );
    }

    /**Load all Professionals from the database
     * @returns { ProfessionalModel[] } a list of professionals
    */
    loadAll(){
        /** ToDo */
        const professionals = [];
        console.log( 'Load all Professional from the database' );
        return professionals;
    }

    /**
     * Upadate a Professional data and save into the databa
     * @param { String } professionalId 
     * @param { ProfessionalModel } professional
     * @returns { ProfessionalModel } updated professional
     */
    update( professionalId, professional ){
        /**ToDo */
        console.log( 'Upadate a Professional data and save into the databa')
        return;
    }

    /**
     * Delete a Professional from the database
     * @param { String } professionalId
     * @returns { Professional } deleted professional
    */
    delete( professionalId ){
        /**ToDo */
        console.log( 'Delete a Professional from the database' );
        return;
    }
}