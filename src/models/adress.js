const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );

const { modelsStructure: { adress }} = require( '../utils/constants' );
const { ADRESS_ID, CEP, STREET, NUMBER, COMPLEMENT, DISTRICT, COUNTY, STATE, COUNTRY } = adress;

const Adress = connection.define('adress',{
    [ADRESS_ID]: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true        
    },
    [CEP]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [STREET]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [NUMBER]: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    [COMPLEMENT]: Sequelize.DataTypes.STRING,
    [DISTRICT]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [COUNTY]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [STATE]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [COUNTRY]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Adress;