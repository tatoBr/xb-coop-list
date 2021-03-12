const { Op } = require( 'sequelize' )

const bcrypt = require('bcrypt');
const connection = require('../database/index');

const UserModel = require('../models/user');
const ProfessionalModel = require('../models/professional');

const { modelsStructure, professionalStatus } = require('../utils/constants');
const { USER_ID, USERNAME, EMAIL, PICTURE, FIRSTNAME, LASTNAME, BIRTHDATE, CPF, PASSWORD, ACCESS_LEVEL, LOGIN_ATTEMPTS, LOGIN_WAIT_TIME, REFRESH_TOKEN } = modelsStructure.user;
const { ADRESS_ID, CEP, STREET, NUMBER, COMPLEMENT, DISTRICT, COUNTY, STATE, COUNTRY } = modelsStructure.adress;
const { PHONELIST_ID, WHATSAAPP, HOMEPHONE, WORKPHONE, OTHERPHONES } = modelsStructure.phonelist
const { SOCIALMEDIAS_ID, INSTAGRAM, FACEBOOK, YOUTUBE, TWITTER, LINKEDIN, TIKTOK, CLUBHOUSE } = modelsStructure.socialmediaList
const { PROFESSIONAL_ID, ACTUATION_FIELDS, SKILLS, EXPERIENCE_LEVEL, ABOUT, PORTIFOLIO_URL, STATUS } = modelsStructure.professional

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
                    {[ EMAIL ]: email },
                    {[ USERNAME ]: username },
                    {[ CPF ]: cpf }
                ]}
            });            
            if( user ) return { message: responses.USER_ALREADY_EXIST, content: user};            
            
            const hash = await bcrypt.hash(password, 10);
            const professional = await ProfessionalModel.create({
                'user': {
                    [USERNAME]: username,
                    [EMAIL]: email,
                    [PICTURE]: picture,
                    [FIRSTNAME]: firstname,
                    [LASTNAME]: lastname,
                    [BIRTHDATE]: birthdate,
                    [CPF]: cpf,
                    [PASSWORD]: hash,
                    [ACCESS_LEVEL]: PROFESSIONAL,
                    [LOGIN_ATTEMPTS]: 0,
                    [LOGIN_WAIT_TIME]: new Date(),
                    'adress': {
                        [CEP]: cep,
                        [STREET]: street,
                        [NUMBER]: number,
                        [COMPLEMENT]: complement,
                        [DISTRICT]: district,
                        [COUNTY]: county,
                        [STATE]: state,
                        [COUNTRY]: country
                    },
                    'phonelist': {
                        [HOMEPHONE]: homephone,
                        [WORKPHONE]: workphone,
                        [WHATSAAPP]: whatsapp,
                        [OTHERPHONES]: otherphones
                    },
                    'socialmediaCatalog': {
                        [INSTAGRAM]: instagram,
                        [FACEBOOK]: facebook,
                        [YOUTUBE]: youtube,
                        [TIKTOK]: tiktok,
                        [TWITTER]: twitter,
                        [LINKEDIN]: linkedin,
                        [CLUBHOUSE]: clubhouse
                    }
                },
                [ACTUATION_FIELDS]: actuationFields,
                [SKILLS]: skills,
                [EXPERIENCE_LEVEL]: experienceLevel,
                [PORTIFOLIO_URL]: portifolioUrl,
                [ABOUT]: about,
                [STATUS]: [ ACTIVE, INACTIVE, IN_ANALYSIS ][Math.floor(Math.random() * 3 )] 
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
            let profColumns = [ ACTUATION_FIELDS, SKILLS, EXPERIENCE_LEVEL, PORTIFOLIO_URL, ABOUT ];
            let userColumns = [ FIRSTNAME, LASTNAME, PICTURE, BIRTHDATE ];
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