const bcrypt = require('bcrypt');
const { Op } = require( 'sequelize' )
const connection = require('../database/index');
const UserModel = require('../models/user');
const { responses, modelsStructure, userAccessLevel:{ admin: ADMINISTRATOR }} = require( '../utils/constants')
const { USER_ID, USERNAME, EMAIL, PICTURE, FIRSTNAME, LASTNAME, BIRTHDATE, CPF, PASSWORD, ACCESS_LEVEL, LOGIN_ATTEMPTS, LOGIN_WAIT_TIME } = modelsStructure.user;

module.exports = class AdminServices{
    async create( data ){
        const { username, email, picture, firstname, lastname, birthdate, cpf, password } = data;
        let columns = [ USER_ID, USERNAME, EMAIL, PICTURE, FIRSTNAME, LASTNAME, BIRTHDATE, CPF, PASSWORD, ACCESS_LEVEL, LOGIN_ATTEMPTS, LOGIN_WAIT_TIME ];
        const t = await connection.transaction();

        try {
            let user = await UserModel.findOne({ where: {
                [Op.or]: [
                    {[ EMAIL ]: email },
                    {[ USERNAME ]: username },
                    {[ CPF ]: cpf }
                ]}
            });            
            if( user ) return { message: responses.USER_ALREADY_EXIST, content: user};
            
            const passwordHash = await bcrypt.hash( password, 10 );            
            let admin = await UserModel.create({
                [USERNAME]: username,
                [EMAIL]: email,
                [PICTURE]: picture,
                [FIRSTNAME]: firstname,
                [LASTNAME]: lastname,
                [BIRTHDATE]: birthdate,
                [CPF]: cpf,
                [PASSWORD]: passwordHash,
                [ACCESS_LEVEL]: ADMINISTRATOR,
                [LOGIN_ATTEMPTS]: 0,
                [LOGIN_WAIT_TIME]: new Date()
            },
            {
                transaction: t
            });            
            await t.commit();
            return { message: responses.USER_SAVED, content: mapAdmin(admin, columns, [USER_ID, USERNAME, EMAIL, PICTURE ])};
        } catch (error) {
           throw error;
        }

    }

    async readById( id ){
        try {
            let administrator = await UserModel.findByPk( id );
            if( !administrator )
                return { message: responses.USER_NOT_FOUND, content: null };
            
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

    async authenticate( email, password ){
        let administrator = await UserModel.findOne({
            where: {[ columns.email ]: email },
            attributes:[ columns.id, columns.email, columns.password ]
        });            
        
        if( !administrator ) return { message: responseMessages.USER_NOT_FOUND, content: null };        
                
        let now = new Date()
        ;
        
        if( administrator[ columns.loginWaitTime ] > now)
            return {
                message: responseMessages.USER_IN_WAIT_TIME,
                content: {
                    [us.username]: user[us.username],
                    [us.email]: user[us.email]
                }  
            };            

        let passwordMatches =  await bcrypt.compare( password, user[us.password]);
        
        if( !passwordMatches ){
            if( user[us.loginAttempts] >= MAX_LOGIN_ATTEMPTS ){
                user[us.loginWaitTime] = new Date( Date.now() + LOGIN_WAIT_TIME );
                user[us.loginAttempts] = 0;
                await user.save();                
            }
            else{
                await user.increment({[ us.loginAttempts ]: 1 });  
            }
            
            return {
                message: responseMessages.PASSWORD_MISMATCH,
                content: null
            };     
        }

        try {
            let administrator = await UserModel.findOne({
                where: {[ columns.email ]: email },
                attributes:[ columns.id, columns.email, columns.password ]
            }
        );
        
        if( !administrator ) return { message: rmsg.USER_NOT_FOUND, content: null };

        let passwordMatches = await bcrypt.compare( password, administrator.password );
        if( !passwordMatches ) return { message: rmsg.PASSWORD_MISMATCH, content: null }
        
        return { message: rmsg.USER_AUTHENTICATED, content: administrator };

        } catch (error) {
            throw error;
        }
    }
}

function mapAdmin( admin, columns, attributes ){    
    let mapped = {};
    for( let attribute of attributes ){
        if( columns.includes( attribute )) mapped[attribute] = admin[attribute]
    }
    return mapped;
}