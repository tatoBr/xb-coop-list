const bcrypt = require('bcrypt');

const connection = require('../database/index');

const User = require('../models/user');
const Professional = require('../models/professional');

const { userAccessLevel: al, professionalStructure: ps, responseMessages, privateKey } = require('../utils/variables');
const { modelsStructure } = require('../utils/variables');
const { user } = require('../utils/inputValidator');



module.exports = class ProfessionalServices {
    /**    
     * @param { data } data 
     */
    async save(data) {
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
    async loadById(id, attributes = undefined) {
        try {
            let queryOptions = generateSelectQuery(attributes);
            let selectResult = await Professional.findByPk(id, queryOptions);

            if (!selectResult) {
                queryOptions.where = { userId: id }
                selectResult = await Professional.findOne(queryOptions);
                if (!selectResult) return { message: responseMessages.USER_NOT_FOUND, content: null };
            }

            return { message: responseMessages.USER_LOADED, content: selectResult };
        } catch (error) {
            return { message: error.message, content: error };
        }
    };

    async loadAll(attributes) {
        try {
            let selectResult = await Professional.findAll(generateSelectQuery(attributes));

            if (selectResult.length > 0) return { message: responseMessages.USERS_LOADED, content: selectResult };
            return { message: responseMessages.NO_USER_TO_LOAD, content: selectResult };
        } catch (error) {
            return { message: error.message, content: null };
        }
    };

    async update(id, data) {
        try {
            let profColumns = [
                modelsStructure.professional.actuationFields,
                modelsStructure.professional.skills,
                modelsStructure.professional.experienceLevel,
                modelsStructure.professional.portifolioUrl
            ];
            let userColumns = [
                modelsStructure.user.firstname,
                modelsStructure.user.lastname,
                modelsStructure.user.picture,
                modelsStructure.user.birthdate
            ];
            let adressColumns = Object.values(modelsStructure.adress);
            let socialMediaColumns = Object.values(modelsStructure.socialmediaList);
            let updatedColumns = 0;

            let professional = await Professional.findByPk(id, {
                attributes: [modelsStructure.professional.id],
                include: {
                    association: Professional.User,
                    include: [User.Adress, User.Phonelist, User.SocialMediaCatalog],
                    attributes: [modelsStructure.user.username, modelsStructure.user.email]
                }
            });

            if (!professional) {
                professional = await Professional.findOne({
                    where: { userId: id },
                    attributes: [modelsStructure.professional.id],
                    include: {
                        association: Professional.User,
                        include: [User.Adress, User.Phonelist, User.SocialMediaCatalog],
                        attributes: [modelsStructure.user.username, modelsStructure.user.email]
                    }
                });
                if (!professional) return { message: responseMessages.USER_NOT_FOUND, content: null };
            }

            for (let column of profColumns)
                if (data[column]) {
                    updatedColumns++;
                    professional[column] = data[column];
                }

            for (let column of userColumns)
                if (data[column]) {
                    updatedColumns++;
                    professional.user[column] = data[column];
                }

            for (let column of adressColumns)
                if (data[column]) {
                    updatedColumns++;
                    professional.user.adress[column] = data[column];
                }

            for (let column of socialMediaColumns)
                if (data[column]) {
                    updatedColumns++;
                    professional.user.socialmediaCatalog[column] = data[column];
                }

            if (updatedColumns > 0)
                await professional.save();

            return { message: responseMessages.USER_UPDATED, content: professional };
        } catch (error) {
            return { message: error.message, content: error };
        }
    };

    async delete(id) {
        try {
            let professional = await Professional.findByPk(id,
                {
                    include: {
                        association: Professional.User,
                        include: [User.Adress, User.Phonelist, User.SocialMediaCatalog]
                    }
                });
            if (!professional) {
                professional = await Professional.findOne({
                    where: { userId: id },
                    include: {
                        association: Professional.User,
                        include: [User.Adress, User.Phonelist, User.SocialMediaCatalog]
                    }
                });
                if (!professional) return { message: responseMessages.USER_NOT_FOUND, content: null };
            }
            await professional.destroy();
            return { message: responseMessages.USER_DELETED, content: null };
        } catch (error) {
            return { message: error.message, content: error };
        }
    };
};

//helper functions
let generateSelectQuery = attributes => {
    let professionalAttributes = [
        modelsStructure.professional.id,
        modelsStructure.professional.actuationFields,
        modelsStructure.professional.skills
    ];
    let userAttributes = [
        modelsStructure.user.firstname,
        modelsStructure.user.lastname,
        modelsStructure.user.email
    ];
    let phonelistAttributes = [
        modelsStructure.phonelist.whatsapp
    ];
    let adressAttributes = [];
    let socialMediaAttributes = [];

    let attArr = []

    if (Array.isArray(attributes)) attArr = [...attributes];
    else attArr = attributes ? Object.keys(attributes) : [];

    if (attArr.length > 0) {
        professionalAttributes = Object.keys(modelsStructure.professional).filter(column => attArr.includes(column));
        userAttributes = Object.keys(modelsStructure.user).filter(column => attArr.includes(column));
        userAttributes = userAttributes.length > 0 ? userAttributes : [modelsStructure.user.id];
        adressAttributes = Object.keys(modelsStructure.adress).filter(column => attArr.includes(column));
        phonelistAttributes = Object.keys(modelsStructure.phonelist).filter(column => attArr.includes(column));
        socialMediaAttributes = Object.keys(modelsStructure.socialmediaList).filter(column => attArr.includes(column));
    };

    let queryOptions = { attributes: professionalAttributes, include: { association: Professional.User, include: [] } };

    if (userAttributes.length > 0) queryOptions.include.attributes = userAttributes;
    if (adressAttributes.length > 0) queryOptions.include.include.push({ association: User.Adress, attributes: adressAttributes });
    if (phonelistAttributes.length > 0) queryOptions.include.include.push({ association: User.Phonelist, attributes: phonelistAttributes });
    if (socialMediaAttributes.length > 0) queryOptions.include.include.push({ association: User.SocialMediaCatalog, attributes: socialMediaAttributes });

    return queryOptions;
}