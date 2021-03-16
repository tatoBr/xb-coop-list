const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );

const AdressModel = require( './adress' );
const PhonelistModel = require( './phonelist' );
const SocialMediaCatalogModel = require( './socialMediaCatalog' );

const User = connection.define('user', {
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true        
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    picture: {
        type: Sequelize.DataTypes.BLOB( 'medium' ),
        allowNull: false
    },
    birthdate: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    firstname: Sequelize.DataTypes.STRING,
    lastname: Sequelize.DataTypes.STRING,
    cpf: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    accessLevel: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    refreshToken: Sequelize.DataTypes.TEXT,
    loginAttempts: Sequelize.DataTypes.INTEGER,
    loginWaitTime: Sequelize.DataTypes.DATE    
});

User.Adress = User.belongsTo( AdressModel, { foreignKey: 'userAdress', onDelete: 'cascade', hooks: true });
User.Phonelist = User.belongsTo( PhonelistModel, { foreignKey: 'userPhones', onDelete: 'cascade', hooks: true });
User.SocialMediaCatalog = User.belongsTo( SocialMediaCatalogModel, { foreignKey: 'userSocialmedias', onDelete: 'cascade', hooks: true });

module.exports = User;