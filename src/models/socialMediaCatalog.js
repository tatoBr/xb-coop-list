const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );

const SocialMediaCatalog = connection.define('socialmediaCatalog',{
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    instagram: Sequelize.DataTypes.STRING,
    facebook: Sequelize.DataTypes.STRING,
    youtube: Sequelize.DataTypes.STRING,
    tiktok: Sequelize.DataTypes.STRING,
    twitter: Sequelize.DataTypes.STRING,
    linkedin: Sequelize.DataTypes.STRING,
    clubhouse: Sequelize.DataTypes.STRING,
})

module.exports = SocialMediaCatalog;