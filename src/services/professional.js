const bcrypt = require('bcrypt');

const connection = require('../database/index');

const User = require('../models/user');
const Professional = require('../models/professional');

const { userAccessLevel: al, professionalStructure: ps, responseMessages, privateKey } = require('../utils/variables');
const custonParser = require('../utils/custonParser');

const { generateToken } = require('../utils/authorization' );


module.exports = class ProfessionalServices {
    /**    
     * @param { data } data 
     */
    async save( data ) {
        let {
            username, email, picture, firstname, lastname, birthdate, cpf, password,
            cep, street, number, complement, district, county, state, country,
            homephone, workphone, whatsapp, otherphones,
            instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse,
            actuationFields, skills, experienceLevel,
            portifolioUrl, about
        } = data;
        const t = await connection.transaction()

        try {
            const hash = await bcrypt.hash(password, 10);            
            birthdate = custonParser.stringToDate( birthdate );

            const professional = await Professional.create({
                'user': {
                    [ps.user.username]: username,
                    [ps.user.email]: email,
                    [ps.user.picture]: picture,
                    [ps.user.firstname]: firstname,
                    [ps.user.lastname]: lastname,
                    [ps.user.birthdate]: birthdate,
                    [ps.user.cpf]: cpf,
                    [ps.user.password]: hash,
                    [ps.user.accessLevel]: al.professional,
                    [ps.user.loginAttempts]: 0,
                    [ps.user.loginWaitTime]: new Date(),
                    'adress': {
                        [ps.adress.cep]: cep,
                        [ps.adress.street]: street,
                        [ps.adress.number]: number,
                        [ps.adress.complement]: complement,
                        [ps.adress.district]: district,
                        [ps.adress.county]: county,
                        [ps.adress.state]: state,
                        [ps.adress.country]: country
                    },
                    'phonelist': {
                        [ps.phonelist.homephone]: homephone,
                        [ps.phonelist.workphone]: workphone,
                        [ps.phonelist.whatsapp]: whatsapp,
                        [ps.phonelist.otherphones]: otherphones
                    },
                    'socialmediaCatalog': {
                        [ps.socialmediaList.instagram]: instagram,
                        [ps.socialmediaList.facebook]: facebook,
                        [ps.socialmediaList.youtube]: youtube,
                        [ps.socialmediaList.tiktok]: tiktok,
                        [ps.socialmediaList.twitter]: twitter,
                        [ps.socialmediaList.linkedin]: linkedin,
                        [ps.socialmediaList.clubhouse]: clubhouse
                    }
                },
                [ps.actuationFields]: actuationFields,
                [ps.skills]: skills,
                [ps.experienceLevel]: experienceLevel,
                [ps.portifolioUrl]: portifolioUrl,
                [ps.about]: about
            },
            {
                transaction: t,
                include: {
                    association: Professional.User,
                    include: [User.Adress, User.Phonelist, User.SocialMediaCatalog]
                }
            });
            await t.commit()
            return { message: responseMessages.USER_SAVED, content: professional };

        } catch (error) {
            await t.rollback();
            if (error.name === "SequelizeUniqueConstraintError") {
                return {
                    message: responseMessages.USER_ALREADY_EXIST, content: error.errors.map(element => {
                        return {
                            message: element.message,
                            field: element.path,
                            value: element.value,
                        }
                    })
                }
            };
            return { message: error.code, message: error.message };
        }
    };

    /**
     * @param { String } id 
     */
    async loadById( userId ) {
        try {
            let selectResult = await Professional.findOne(
                {
                    where:{ userId: userId },
                    include:{
                        association: Professional.User,
                        attributes: [ ps.user.firstname, ps.user.lastname, ps.user.email],
                        include: [
                            {
                                association: User.Adress,
                                attributes:[ ps.adress.country, ps.adress.state, ps.adress.county ]
                            },
                            {
                                association: User.Phonelist,
                                attributes:[ ps.phonelist.whatsapp,  ps.phonelist.homephone, ps.phonelist.workphone ]
                            }
                        ]
                    },
                    attributes: [ps.id, ps.skills, ps.actuationFields ]
                }                
            );
            if (!selectResult) return { message: responseMessages.USER_NOT_FOUND, content: null };
            return { message: responseMessages.USER_LOADED, content: selectResult };
        } catch (error) {
            return {message: error.message, content: error };
        }
    };
    
    async loadAll() {
        try {
            let selectResult = await Professional.findAll({
                include:{
                    association: Professional.User,
                    attributes:[ ps.user.id, ps.user.firstname, ps.user.lastname, ps.user.email ],
                    include:{
                        association: User.Phonelist,
                        attributes:[ ps.phonelist.whatsapp ]
                    }                    
                },               
                attributes: [ps.id, ps.actuationFields, ps.skills ],
            });
            return { message: responseMessages.USERS_LOADED, content: selectResult };

        } catch (error) {
            return { message: error.message, content: null };
        }
    };

    /**
     * Upadate a Professional data and save into the databa
     * @param { String } professionalId 
     * @param { Object } data
     * @returns { ProfessionalModel } updated professional
     */
    async update( userId, data ) {
        try {
            let profColumns = [ ps.actuationFields, ps.skills, ps.experienceLevel, ps.about, ps.portifolioUrl ];
            let userColumns = [ ps.user.firstname, ps.user.lastname, ps.user.picture, ps.user.birthdate ];
            let adressColumns = Object.values( ps.adress );
            let socialMediaColumns = Object.values( ps.socialmediaList );
            let updatedColumns = 0;
            let professional = await Professional.findOne(
                {
                    where:{ userId: userId },
                    include:{
                        association: Professional.User,
                        include: [ User.Adress, User.Phonelist, User.SocialMediaCatalog ]
                    }
                }                
            );

            if (!professional)
                return { code: responseMessages.USER_NOT_FOUND, content: null };
                
            for( let column of profColumns )                
                if( data[column] ){
                    updatedColumns++;
                    professional[column] = data[column];
                } 
            
            for( let column of userColumns )                
                if( data[column] ){
                    updatedColumns++;
                    professional.user[column] = data[column]; 
                }
            
            for( let column of adressColumns )
                if( data[column] ){
                    updatedColumns++;
                    professional.user.adress[column] = data[column];
                }
            
            for( let column of socialMediaColumns )
                if( data[column] ){
                    updatedColumns++;
                    professional.user.socialmediaCatalog[column] = data[column]; 
                }
            
            if( updatedColumns > 0 )
                await professional.save();
           
           return { message: responseMessages.USER_UPDATED, content: professional };
        } catch (error) {
            return {message: error.message, content: error };
        }
    };

    /** 
     * @param { String } userId
    */
    async delete( userId ) {
        try {
            let professional = await Professional.findOne({ where:{ userId: userId }});
            await professional.destroy();
            return { message: responseMessages.USER_DELETED, content: null };
        } catch (error) {
            return { message: error.message, content: error };
        }
    };
};