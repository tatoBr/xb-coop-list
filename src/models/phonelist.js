const Sequelize = require( 'sequelize' );
const connection = require( '../database/index');

const Phonelist = connection.define('phonelist',{
    id: {        
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true       
    },
    homephone: Sequelize.DataTypes.STRING,
    workphone: Sequelize.DataTypes.STRING,
    whatsapp: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    otherphones: {
        type: Sequelize.DataTypes.ARRAY( Sequelize.DataTypes.STRING )
    }
});

module.exports = Phonelist;