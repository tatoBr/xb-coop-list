const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );
const UserModel = require('./user' );

const Professional = connection.define('professional', {
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    actuationFields: Sequelize.DataTypes.ARRAY( Sequelize.DataTypes.STRING ),    
    skills: Sequelize.DataTypes.ARRAY( Sequelize.DataTypes.STRING ),
    experienceLevel: Sequelize.DataTypes.STRING,
    portifolioUrl: Sequelize.DataTypes.STRING,
    about: Sequelize.DataTypes.STRING,
    status: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'IN ANALYSIS',
        allowNull: false
    }
});

Professional.User = Professional.belongsTo( UserModel, { foreignKey: 'userId', onDelete: 'cascade', hooks: true });

module.exports = Professional;