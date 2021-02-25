const Sequelize = require( 'sequelize' );
const connection = require( '../database/index');

const { professionalStructure : { phonelist : pl }} = require( '../utils/variables' );

const Phonelist = connection.define('phonelist',{
    id: {        
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1(),
        allowNull: false,
        unique: true,
        primaryKey: true       
    },
    [pl.homephone]: Sequelize.DataTypes.STRING,
    [pl.workphone]: Sequelize.DataTypes.STRING,
    [pl.whatsapp]: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    [pl.otherphones]: {
        type: Sequelize.DataTypes.ARRAY( Sequelize.DataTypes.STRING )
    }
});

module.exports = Phonelist;
// /**
//  * Represents a Catalog of phone numbers
//  */
// module.exports = class PhoneList{
//     /**
//      * @param { String } home 
//      * @param { String } work 
//      * @param { String } whatsapp 
//      * @param { String } others 
//      */
//     constructor( home, work, whatsapp, others ){
//         this.home = validatePhone( home );
//         this.work = validatePhone( work );
//         this.whatsapp = validatePhone( whatsapp );
//         this.others = others.map( number =>  validatePhone( number ));
//     };
// }

// const validatePhone = ( phone ) =>{
//     return typeof phone === 'string' ? phone : phone?.toString();
// }