const SequelizeMock = require( 'sequelize-mock' );
const connection = new SequelizeMock();

const Phonelist = connection.define('phonelist',{
    id: {        
        type: SequelizeMock.UUID,
        defaultValue: SequelizeMock.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true       
    },
    homephone: SequelizeMock.STRING,
    workphone: SequelizeMock.STRING,
    whatsapp: {
        type: SequelizeMock.STRING,
        allowNull: false
    },
    otherphones: {
        type: SequelizeMock.ARRAY( SequelizeMock.STRING )
    }
});

module.exports = Phonelist;