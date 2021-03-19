const bcrypt = require('bcrypt');
const { Op } = require( 'sequelize' )
const connection = require('../database/index');
const UserModel = require('../models/user');
const { responses, userAccessLevel:{ admin: ADMINISTRATOR }} = require( '../utils/constants');
const { modelMapper } = require('../utils/helpers')

module.exports = class AdminServices{
    async create( data ){
        const { username, email, picture, firstname, lastname, birthdate, cpf, password } = data;
        const t = await connection.transaction();

        try {
            let user = await UserModel.findOne({ where: {
                [Op.or]: [
                    { email: email },
                    { username: username },
                    { cpf: cpf }
                ]}
            });            
            if( user ) return { message: responses.USER_ALREADY_EXIST, content: user};
            
            const passwordHash = await bcrypt.hash( password, 10 );            
            
            let admin = await UserModel.create({
                username: username,
                email: email,
                picture: picture,
                firstname: firstname,
                lastname: lastname,
                birthdate: birthdate,
                cpf: cpf,
                password: passwordHash,
                accessLevel: ADMINISTRATOR,
                loginAttempts: 0,
                loginWaitTime: new Date()
            },
            {
                transaction: t
            });            
            await t.commit();
            return { message: responses.USER_SAVED, content: admin };
        } catch (error) {
           throw error;
        }
    }

    async readById( id ){
        try {
            let administrator = await UserModel.findByPk( id );            
            if( !administrator )
                return { message: responses.USER_NOT_FOUND, content: administrator };
            
            return { message: responses.USER_LOADED, content: administrator }            
        } catch (error) {
            throw error;
        }
    }

    async update( id, data ){
        try {           
            let updatedColumns = 0;      
            let administrator = await UserModel.findByPk( id );

            if( !administrator ) return { message: responses.USER_NOT_FOUND, content: null };

            for( let property in data ){
                if( property in administrator && data[ property ] ){
                    administrator[ property ] = data[ property ];
                    updatedColumns++;
                }
            }
            if( updatedColumns > 0 ){
                await administrator.save();
                return { message: responses.USER_UPDATED, content: administrator };
            }
            return { message: responses.USER_NOT_MODIFIED, content: null };
        } catch (error) {
            throw error;
        }         
    }

    async delete( id ){
        try {
            let administrator = await UserModel.findByPk( id )
            if( !administrator ) return { message:responses.USER_NOT_FOUND, content: null };

            await administrator.destroy();

            return { message:responses.USER_DELETED, content: administrator };
        } catch (error) {
            throw error;
        }
    }
}