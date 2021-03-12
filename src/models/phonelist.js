const Sequelize = require( 'sequelize' );
const connection = require( '../database/index');

const { modelsStructure: { phonelist }} = require( '../utils/constants' );
const { PHONELIST_ID, HOMEPHONE, WORKPHONE, WHATSAAPP, OTHERPHONES } = phonelist;

const Phonelist = connection.define('phonelist',{
    [PHONELIST_ID]: {        
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true       
    },
    [HOMEPHONE]: Sequelize.DataTypes.STRING,
    [WORKPHONE]: Sequelize.DataTypes.STRING,
    [WHATSAAPP]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [OTHERPHONES]: {
        type: Sequelize.DataTypes.ARRAY( Sequelize.DataTypes.STRING )
    }
});

module.exports = Phonelist;