const bcrypt = require('bcrypt');
const connection = require('../database/index');
const User = require('../models/user');
const { responseMessages: rmsg, userAccessLevel:{ admin }, modelsStructure :{ user : columns }} = require( '../utils/variables')

module.exports = class AdminServices{
    async save( data ){
        const { username, email, picture, firstname, lastname, birthdate, cpf, password } = data;
        const t = await connection.transaction();

        try {
            const passwordHash = await bcrypt.hash( password, 10 );            

            let administrator = await User.create({
                [columns.username]: username,
                [columns.email]: email,
                [columns.picture]: picture,
                [columns.firstname]: firstname,
                [columns.lastname]: lastname,
                [columns.birthdate]: birthdate,
                [columns.cpf]: cpf,
                [columns.password]: passwordHash,
                [columns.accessLevel]: admin,
                [columns.loginAttempts]: 0,
                [columns.loginWaitTime]: new Date()
            },
            {
                transaction: t
            })
            let{ id, username: adminName, email: adminEmail } = administrator;
            await t.commit();
            return { message: rmsg.USER_SAVED, content: { id, username: adminName, email: adminEmail }};
        } catch (error) {
           throw error;
        }

    }

    async readById( id ){
        try {
            let administrator = await User.findByPk( id, {
                attributes: [                    
                    columns.username,
                    columns.email,
                    columns.picture,
                    columns.firstname,
                    columns.lastname,
                    columns.birthdate                
                ]
            });
            if( !administrator ) return { message: rmsg.USER_NOT_FOUND, content: null };
            return { message: rmsg.USERS_LOADED, content: administrator }            
        } catch (error) {
            throw error;
        }
    }

    async update( id, data ){
        try {
            let attributes = [ columns.picture, columns.firstname, columns.lastname, columns.birthdate ];
            let changes = 0;      
            let administrator = await User.findByPk(
                id,
                {
                    attributes:[
                        columns.id,
                        columns.username,
                        columns.email,
                        columns.firstname,
                        columns.lastname,
                        columns.birthdate
                    ]
                }
            );

            if( !administrator ) return { message: rmsg.USER_NOT_FOUND, content: null };

            for( let propertie in data ){
                if( attributes.includes( propertie ) && data[ propertie ]){
                    administrator[ propertie ] = data[propertie];
                    changes++;
                }
            }
            if( changes > 0 ){
                await administrator.save();
                return { message: rmsg.USER_UPDATED, content: administrator };
            }
            return { message: rmsg.USER_NOT_MODIFIED, content: null };
        } catch (error) {
            throw error;
        }         
    }

    async delete( id ){
        try {
            let administrator = await User.findByPk( id, { attributes: [ columns.id ]})
            if( !administrator ) return { message: rmsg.USER_NOT_FOUND, content: null };

            await administrator.destroy();

            return { message: rmsg.USER_DELETED, content: administrator };
        } catch (error) {
            throw error;
        }
    }

    async authenticate( email, password ){
        let administrator = await User.findOne({
            where: {[ columns.email ]: email },
            attributes:[ columns.id, columns.email, columns.password ]
        });            
        
        if( !administrator ) return { message: responseMessages.USER_NOT_FOUND, content: null };        
                
        let now = new Date();
        
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

        //******* */
        try {
            let administrator = await User.findOne({
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