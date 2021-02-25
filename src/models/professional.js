const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );

const User = require('./user' );

const { professionalStructure: ps } = require('../utils/variables');

const Professional = connection.define('professional', {
    id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    [ps.actuationFields]: Sequelize.DataTypes.ARRAY( Sequelize.DataTypes.STRING ),    
    [ps.skills]: Sequelize.DataTypes.ARRAY( Sequelize.DataTypes.STRING ),
    [ps.experienceLevel]: Sequelize.DataTypes.STRING,
    [ps.portifolioUrl]: Sequelize.DataTypes.STRING,
    [ps.about]: Sequelize.DataTypes.STRING
});

Professional.User = Professional.belongsTo( User );

module.exports = Professional;