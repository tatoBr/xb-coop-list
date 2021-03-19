const SequelizeMock = require( 'sequelize-mock' );
const connection = new SequelizeMock();

const Adress = connection.define('adress',{
    id: {
        type: SequelizeMock.UUID,
        defaultValue: SequelizeMock.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true        
    },
    cep: {
        type: SequelizeMock.STRING,
        allowNull: false
    },
    street: {
        type: SequelizeMock.STRING,
        allowNull: false
    },
    number: {
        type: SequelizeMock.INTEGER,
        allowNull: false
    },
    complement: SequelizeMock.STRING,
    district: {
        type: SequelizeMock.STRING,
        allowNull: false
    },
    county: {
        type: SequelizeMock.STRING,
        allowNull: false
    },
    state: {
        type: SequelizeMock.STRING,
        allowNull: false
    },
    country: {
        type: SequelizeMock.STRING,
        allowNull: false
    }
});

module.exports = Adress;