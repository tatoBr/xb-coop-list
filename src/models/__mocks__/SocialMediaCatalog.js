const SequelizeMock = require( 'sequelize-mock' );
const connection = new SequelizeMock();

const SocialMediaCatalog = connection.define('socialmediaCatalog',{
    id: {
        type: SequelizeMock.UUID,
        defaultValue: SequelizeMock.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    instagram: SequelizeMock.STRING,
    facebook: SequelizeMock.STRING,
    youtube: SequelizeMock.STRING,
    tiktok: SequelizeMock.STRING,
    twitter: SequelizeMock.STRING,
    linkedin: SequelizeMock.STRING,
    clubhouse: SequelizeMock.STRING,
})

module.exports = SocialMediaCatalog;