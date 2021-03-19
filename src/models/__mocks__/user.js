const dbMock = require('../../database/__mocks__/index');

const AdressModel = require( './adress' );
// const PhonelistModel = require( './phonelist' );
// const SocialMediaCatalogModel = require( './socialMediaCatalog' );

const user = dbMock.define('user', {
    id: '43a778a4-8823-11eb-8dcd-0242ac130003',
    username: 'test1',
    email: 'email@test.com',
    picture: 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4g',
    birthdate: new Date().toISOString(),
    firstname: 'Firstname',
    lastname: 'LastName',
    cpf: '11111111111',
    accessLevel: 'adm',
    password: '$2y$10$7IQlYvgioAh5a8c0xBYDaO/pkrFUIPYVaTduUvTm274k3vWXPmgtm',//abc123
    refreshToken: '',
    loginAttempts: 0,
    loginWaitTime: new Date()    
});

user.findByPk = user.findById;
user.save = ()=>{};
user.destroy = ()=>{};

user.Adress = user.belongsTo( AdressModel, { foreignKey: 'userAdress', onDelete: 'cascade', hooks: true });
// user.Phonelist = user.belongsTo( PhonelistModel, { foreignKey: 'userPhones', onDelete: 'cascade', hooks: true });
// user.SocialMediaCatalog = user.belongsTo( SocialMediaCatalogModel, { foreignKey: 'userSocialmedias', onDelete: 'cascade', hooks: true });

user.$queryInterface.$useHandler((query, queryOptions, done )=>{    
    if( query === 'findOne'){
        let where = queryOptions[0].where;
        let orClausures = where[Object.getOwnPropertySymbols(where)[0]];
        if( orClausures[0].email === 'email@test.com' || orClausures[1].username === 'test1' || orClausures[2].cpf === 11111111111 )
            return user._defaults;

        return Promise.resolve( undefined );
    };

    if(query==='findById'){
        if( queryOptions[0] !== '43a778a4-8823-11eb-8dcd-0242ac130003' ){           
            return Promise.resolve( undefined );
        }
        return { 
            ...user._defaults,
            ...user
        };
    }
    return null;
});

module.exports = user;