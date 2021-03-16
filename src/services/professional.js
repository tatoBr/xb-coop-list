const { Op } = require( 'sequelize' )

const bcrypt = require('bcrypt');
const connection = require('../database/index');

const UserModel = require('../models/user');
const ProfessionalModel = require('../models/professional');

const { professionalStatus } = require('../utils/constants');

const { ACTIVE, INACTIVE, IN_ANALYSIS } = professionalStatus;
const { userAccessLevel: { professional: PROFESSIONAL }, responses } = require( '../utils/constants')

module.exports = class ProfessionalServices {    
    async create( data ) {
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
            let user = await UserModel.findOne({ where: {
                [Op.or]: [
                    { email: email },
                    { username: username },
                    { cpf: cpf }
                ]}
            });            
            if( user ) return { message: responses.USER_ALREADY_EXIST, content: user};            
            
            const hash = await bcrypt.hash(password, 10);
            const professional = await ProfessionalModel.create({
                'user': {
                    username: username,
                    email: email,
                    picture: picture,
                    firstname: firstname,
                    lastname: lastname,
                    birthdate: birthdate,
                    cpf: cpf,
                    password: hash,
                    accessLevel: PROFESSIONAL,
                    loginAttempts: 0,
                    loginWaitTime: new Date(),
                    'adress': {
                        cep: cep,
                        street: street,
                        number: number,
                        complement: complement,
                        district: district,
                        county: county,
                        state: state,
                        country: country
                    },
                    'phonelist': {
                        homephone: homephone,
                        workphone: workphone,
                        whatsapp: whatsapp,
                        otherphones: otherphones
                    },
                    'socialmediaCatalog': {
                        instagram: instagram,
                        facebook: facebook,
                        youtube: youtube,
                        tiktok: tiktok,
                        twitter: twitter,
                        linkedin: linkedin,
                        clubehouse: clubhouse
                    }
                },
                actuationFields: actuationFields,
                skills: skills,
                experienceLevel: experienceLevel,
                portifolioUrl: portifolioUrl,
                about: about,
                status: 'INACTIVE' 
            },
            {
                transaction: t,
                include: {
                    association: ProfessionalModel.User,
                    include: [UserModel.Adress, UserModel.Phonelist, UserModel.SocialMediaCatalog]
                }
            });
            await t.commit()
            return { message: responses.USER_SAVED, content: professional };

        } catch (error) {
            await t.rollback();            
            throw error;
        }
    };

    async readById(id) {
        try {
            let queryResult = await ProfessionalModel.findByPk(id,{
                include: {
                    association: ProfessionalModel.User,
                    include: [ UserModel.Adress, UserModel.Phonelist, UserModel.SocialMediaCatalog ]
                }
            });

            if ( !queryResult ) {
                queryResult = await ProfessionalModel.findOne({
                    where: { userId: id },
                    include: {
                        association: ProfessionalModel.User,
                        include: [ UserModel.Adress, UserModel.Phonelist, UserModel.SocialMediaCatalog ]
                    }
                });
                if ( !queryResult )
                    return { message: responses.USER_NOT_FOUND, content: null };
            }

            return { message: responses.USER_LOADED, content: queryResult };
        } catch (error) {
            return { message: error.code, content: error };
        }
    };

    async read() {
        try {
            let professionals = await ProfessionalModel.findAll({
                include: {
                    association: ProfessionalModel.User,
                    include: [ UserModel.Adress, UserModel.Phonelist, UserModel.SocialMediaCatalog ]
                }
            });

            if (professionals.length > 0)
                return { message:  responses.USERS_LOADED, content: professionals };

            return { message: responses.NO_USER_TO_LOAD, content: professionals };
        } catch (error) {
           throw error;
        }
    };

    async update(id, data) {
        try {
            let profColumns = [ 'actuationFields', 'skills', 'experienceLevel', 'portifolioUrl', 'about' ];
            let userColumns = [ 'firstname', 'lastname', 'picture', 'birthdate' ];
            let adressColumns = Object.values(modelsStructure.adress);
            let socialMediaColumns = Object.values(modelsStructure.socialmediaList);
            let updatedColumns = 0;

            let professional = await ProfessionalModel.findByPk( id, {
                include: {
                    association: ProfessionalModel.User,
                    include: [UserModel.Adress, UserModel.Phonelist, UserModel.SocialMediaCatalog],                        
                }            
            });

            if (!professional) {
                professional = await ProfessionalModel.findOne({
                    where: { userId: id },                   
                    include: {
                        association: ProfessionalModel.User,
                        include: [UserModel.Adress, UserModel.Phonelist, UserModel.SocialMediaCatalog],                        
                    }
                });
                if (!professional) return { message: responses.USER_NOT_FOUND, content: null };
            }

            for (let column of profColumns)
                if (column in data) {
                    updatedColumns++;
                    professional[column] = data[column];
                }

            for (let column of userColumns)
                if (column in data) {
                    updatedColumns++;
                    professional.user[column] = data[column];
                }

            for (let column of adressColumns)
                if (column in data) {
                    updatedColumns++;
                    professional.user.adress[column] = data[column];
                }

            for (let column of socialMediaColumns)
                if (column in data) {
                    updatedColumns++;
                    professional.user.socialmediaCatalog[column] = data[column];
                }

            if (updatedColumns > 0)
                await professional.save();

            return { message: responses.USER_UPDATED, content: professional };
        } catch (error) {
            throw error;
        }
    };

    async delete(id) {
        try {
            let professional = await ProfessionalModel.findByPk(id,
                {
                    include: {
                        association: ProfessionalModel.User,
                        include: [UserModel.Adress, UserModel.Phonelist, UserModel.SocialMediaCatalog]
                    }
                });
            if (!professional) {
                professional = await ProfessionalModel.findOne({
                    where: { userId: id },
                    include: {
                        association: ProfessionalModel.User,
                        include: [UserModel.Adress, UserModel.Phonelist, UserModel.SocialMediaCatalog]
                    }
                });
                if (!professional) return { message: responses.USER_NOT_FOUND, content: null };
            }
            await professional.destroy();
            return { message: responses.USER_DELETED, content: professional };
        } catch (error) {
            throw error;
        }
    };
};