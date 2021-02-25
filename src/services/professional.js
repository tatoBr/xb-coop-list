const bcrypt = require('bcrypt');

const connection = require('../database/index');

const User = require('../models/user');
const Professional = require('../models/professional');

const { userAccessLevel: al, professionalStructure: ps, responseMessages, privateKey } = require('../utils/variables');

const { generateToken } = require('../utils/authorization' );


module.exports = class ProfessionalServices {
    async authenticate( email, password ){
        const selectResult = await User.findOne({
            where: {
                [ps.user.email]: email
            },
            attributes: [ ps.user.id, ps.user.username, ps.user.password, ps.user.accessLevel ]
        });

        if( !selectResult ) return { code: responseMessages.USER_NOT_FOUND, content: null };
                
        try {
            let match = await bcrypt.compare( password, selectResult.password );
            if( !match ) return { code: responseMessages.PASSWORD_MISMATCH, content: null };

            let payload = {
                [ps.user.id]: selectResult[ps.user.id ],
                [ps.user.username]: selectResult[ps.user.username],            
                [ps.user.accessLevel]: selectResult[ps.user.accessLevel]
            }
            let token = generateToken( payload );

            return { code: responseMessages.USER_AUTHENTICATED, content: token };

        } catch ( error ) {
            return { code: error.message, content: error };
        }
    }

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
            return { code: responseMessages.USER_SAVED, content: professional };

        } catch (error) {
            await t.rollback();
            if (error.name === "SequelizeUniqueConstraintError") {
                return {
                    code: responseMessages.USER_ALREADY_EXIST, content: error.errors.map(element => {
                        return {
                            message: element.message,
                            field: element.path,
                            value: element.value,
                        }
                    })
                }
            };
            return { code: error.code, message: error.message };
        }
    };

    /**
     * @param { String } id 
     */
    async loadById( id ) {
        try {
            let selectResult = await Professional.findByPk( id, {
                include:{
                    association: Professional.User,
                    include: [ User.Adress, User.Phonelist, User.SocialMediaCatalog ]
                }
            });
            if (!selectResult) return { code: responseMessages.USER_NOT_FOUND, content: null };
            return { code: responseMessages.USER_LOADED, content: selectResult };
        } catch (error) {
            return {code: error.message, content: error };
        }
    };

    /**
     * @returns { Array } a list of professionals
    */
    async loadAll() {
        try {
            let selectResult = await Professional.findAll({
                include:{
                    association: Professional.User,
                    attributes:[ ps.user.username, ps.user.email ],                    
                },               
                attributes: ['id'],
            });
            return { code : responseMessages.USERS_LOADED, content: selectResult };

        } catch (error) {
            return { code: error.message, content: error };
        }
    };

    /**
     * Upadate a Professional data and save into the databa
     * @param { String } professionalId 
     * @param { Object } data
     * @returns { ProfessionalModel } updated professional
     */
    async update(id , data ) {
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
    async delete(professionalId) {
        /**ToDo */
        return {
            message: 'Professional deleted.',
            content: {}
        };
    };
};