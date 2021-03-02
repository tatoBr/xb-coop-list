const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );

const Adress = require( './adress' );
const Phonelist = require( './phonelist' );
const SocialMediaCatalog = require( './socialMediaCatalog' );

const { professionalStructure: { user }} = require('../utils/variables');

const User = connection.define('user', {
    [user.id]: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    [user.username]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true        
    },
    [user.email]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    [user.picture]: {
        type: Sequelize.DataTypes.BLOB( 'medium' ),
        allowNull: false
    },
    [user.birthdate]: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    },
    [user.firstname]: Sequelize.DataTypes.STRING,
    [user.lastname]: Sequelize.DataTypes.STRING,
    [user.cpf]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    [user.accessLevel]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    [user.password]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [user.refreshToken]: Sequelize.DataTypes.STRING,
    [user.loginAttempts]: Sequelize.DataTypes.INTEGER,
    [user.loginWaitTime]: Sequelize.DataTypes.DATE    
});

User.Adress = User.belongsTo( Adress, { foreignKey: 'userAdress', onDelete: 'cascade', hooks: true });
User.Phonelist = User.belongsTo( Phonelist, { foreignKey: 'userPhones', onDelete: 'cascade', hooks: true });
User.SocialMediaCatalog = User.belongsTo( SocialMediaCatalog, { foreignKey: 'userSocialmedias', onDelete: 'cascade', hooks: true });

module.exports = User;