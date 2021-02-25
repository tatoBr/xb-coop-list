const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );

const { professionalStructure: { socialmediaList: sml }} = require('../utils/variables');

const SocialMediaCatalog = connection.define('socialmediaCatalog',{
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    [sml.instagram]: Sequelize.DataTypes.STRING,
    [sml.facebook]: Sequelize.DataTypes.STRING,
    [sml.youtube]: Sequelize.DataTypes.STRING,
    [sml.tiktok]: Sequelize.DataTypes.STRING,
    [sml.twitter]: Sequelize.DataTypes.STRING,
    [sml.linkedin]: Sequelize.DataTypes.STRING,
    [sml.clubhouse]: Sequelize.DataTypes.STRING,
})

module.exports = SocialMediaCatalog;

// /**
//  * Represents a catalog of socialmedia links
//  */
// module.exports = class SocialMediaCatalog{
//     /**    
//      * @param {String} instagram 
//      * @param {String} facebook 
//      * @param {String} youtube 
//      * @param {String} tiktok 
//      * @param {String} twitter 
//      * @param {String} linkedin 
//      * @param {String} clubhouse 
//      */
//     constructor( instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse ){
//         this.instagram = instagram;
//         this.facebook = facebook;
//         this.youtube = youtube;
//         this.tiktok = tiktok;
//         this.twitter = twitter;
//         this.linkedin = linkedin;
//         this.clubhouse = clubhouse;
//     }
// };