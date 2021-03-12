const Sequelize = require( 'sequelize' );
const connection = require( '../database/index' );
const UserModel = require('./user' );

const { modelsStructure: { professional } } = require('../utils/constants');
const { PROFESSIONAL_ID, ACTUATION_FIELDS, SKILLS, EXPERIENCE_LEVEL, PORTIFOLIO_URL, ABOUT, STATUS } = professional;

const Professional = connection.define('professional', {
    [PROFESSIONAL_ID]: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    [ACTUATION_FIELDS]: Sequelize.DataTypes.ARRAY( Sequelize.DataTypes.STRING ),    
    [SKILLS]: Sequelize.DataTypes.ARRAY( Sequelize.DataTypes.STRING ),
    [EXPERIENCE_LEVEL]: Sequelize.DataTypes.STRING,
    [PORTIFOLIO_URL]: Sequelize.DataTypes.STRING,
    [ABOUT]: Sequelize.DataTypes.STRING,
    [STATUS]: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'IN ANALYSIS',
        allowNull: false
    }
});

Professional.User = Professional.belongsTo( UserModel, { foreignKey: 'userId', onDelete: 'cascade', hooks: true });

module.exports = Professional;