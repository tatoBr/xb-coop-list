const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );

const { modelsStructure: { socialmediaList }} = require('../utils/constants');
const { SOCIALMEDIAS_ID, INSTAGRAM, FACEBOOK, YOUTUBE, TWITTER, TIKTOK, LINKEDIN, CLUBHOUSE } = socialmediaList;

const SocialMediaCatalog = connection.define('socialmediaCatalog',{
    [SOCIALMEDIAS_ID]: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    [INSTAGRAM]: Sequelize.DataTypes.STRING,
    [FACEBOOK]: Sequelize.DataTypes.STRING,
    [YOUTUBE]: Sequelize.DataTypes.STRING,
    [TIKTOK]: Sequelize.DataTypes.STRING,
    [TWITTER]: Sequelize.DataTypes.STRING,
    [LINKEDIN]: Sequelize.DataTypes.STRING,
    [CLUBHOUSE]: Sequelize.DataTypes.STRING,
})

module.exports = SocialMediaCatalog;