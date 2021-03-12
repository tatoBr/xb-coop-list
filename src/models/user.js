const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );

const AdressModel = require( './adress' );
const PhonelistModel = require( './phonelist' );
const SocialMediaCatalogModel = require( './socialMediaCatalog' );

const { modelsStructure : { user }} = require('../utils/constants');
const { USER_ID, USERNAME, EMAIL, PICTURE, FIRSTNAME, LASTNAME, BIRTHDATE, CPF, PASSWORD, ACCESS_LEVEL, LOGIN_ATTEMPTS, LOGIN_WAIT_TIME, REFRESH_TOKEN } = user;

const User = connection.define('user', {
    [USER_ID]: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    [USERNAME]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true        
    },
    [EMAIL]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    [PICTURE]: {
        type: Sequelize.DataTypes.BLOB( 'medium' ),
        allowNull: false
    },
    [BIRTHDATE]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [FIRSTNAME]: Sequelize.DataTypes.STRING,
    [LASTNAME]: Sequelize.DataTypes.STRING,
    [CPF]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    [ACCESS_LEVEL]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    [PASSWORD]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [REFRESH_TOKEN]: Sequelize.DataTypes.TEXT,
    [LOGIN_ATTEMPTS]: Sequelize.DataTypes.INTEGER,
    [LOGIN_WAIT_TIME]: Sequelize.DataTypes.DATE    
});

User.Adress = User.belongsTo( AdressModel, { foreignKey: 'userAdress', onDelete: 'cascade', hooks: true });
User.Phonelist = User.belongsTo( PhonelistModel, { foreignKey: 'userPhones', onDelete: 'cascade', hooks: true });
User.SocialMediaCatalog = User.belongsTo( SocialMediaCatalogModel, { foreignKey: 'userSocialmedias', onDelete: 'cascade', hooks: true });

module.exports = User;