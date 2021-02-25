const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );

const { professionalStructure : { adress }} = require( '../utils/variables' );

const Adress = connection.define('adress',{
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true        
    },
    [adress.cep]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [adress.street]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [adress.number]: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    [adress.complement]: Sequelize.DataTypes.STRING,
    [adress.district]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [adress.county]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [adress.state]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [adress.country]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Adress;