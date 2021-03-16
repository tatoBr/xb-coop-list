const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );

const Adress = connection.define('adress',{
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true        
    },
    cep: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    complement: Sequelize.DataTypes.STRING,
    district: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    county: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Adress;