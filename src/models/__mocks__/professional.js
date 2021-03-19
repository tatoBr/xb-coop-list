const connection = require('../../database/__mocks__/index');
const UserModel = require('./user' );

const professional = connection.define('professional', {
    id: '5c3e9ff6-88d1-11eb-8dcd-0242ac130003',
    actuationFields: ['field1', 'field2'],    
    skills: ['skill1','skill2', 'skill3'],
    experienceLevel: 'expert',
    portifolioUrl: 'www.test.com',
    about: 'some randon text',
    status:  'IN ANALYSIS'
});

professional.User = professional.belongsTo( UserModel, { foreignKey: 'userId', onDelete: 'cascade', hooks: true });
professional.findByPk = professional.findById;
professional.save = ()=>{};
professional.destroy = ()=>{};

professional.$queryInterface.$useHandler((query, queryOptions, done) => {
    if( query === 'findOne'){
        if( queryOptions ){
            let where = queryOptions[0]?.where;
            if(  where ){
                let orClausures = where[Object.getOwnPropertySymbols(where)[0]];
                if( orClausures && ( orClausures[0]?.email === 'email@test.com' || orClausures[1]?.username === 'test1' || orClausures[2]?.cpf === 11111111111 ))
                    return professional.build({});
            }
        }

        return Promise.resolve( undefined );
    };  
    if(query==='findById'){
        if( queryOptions[0] !== "5c3e9ff6-88d1-11eb-8dcd-0242ac130003" ){           
            return Promise.resolve( undefined );
        }
        return {
            ...professional._values,
            ...professional
        };
    }

    if(query === 'findAll'){
        let list = new Array(10).fill(professional.build())
        return list;
    }  
})


module.exports = professional;