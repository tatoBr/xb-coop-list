const uuid = require( 'uuid' );
const bcrypt = require( 'bcrypt' );
const Adress = require("./adress");
const PhoneList = require( "./phonelist" );
const SocialMediaList = require( "./socialMediaList" );


const saltrounds = 10;

module.exports = class Professional{
    /**
     * Represents a Professional
     * @constructor
     * @param { String } name 
     * @param { String } email 
     * @param { Number } cpf
     * @param { Date } birthdate 
     * @param { Number } whatsapp
     * @param { Number } homePhone
     * @param { Number } workphone
     * @param { Number[] } otherPhones
     * @param { String } instagram
     * @param { String } facebook
     * @param { String } youtube
     * @param { String } tiktok
     * @param { String } twitter
     * @param { String } linkedin
     * @param { String } clubhouse     
     * @param { Number } cep
     * @param { String } street
     * @param { Number } number
     * @param { String } complement
     * @param { String } district
     * @param { String } county
     * @param { String } state
     * @param { String } country
     * @param {[String]} actuationFields 
     * @param {[String]} skills 
     * @param { String } experienceLevel 
     * @param { String } portifolioUrl 
     * @param { String } about 
     * @param { String } pictureUrl 
     * @param { String } password 
     */
    constructor( 
        name, email, cpf, birthdate,
        whatsapp, homePhone, workphone, otherPhones = [],
        instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse,
        cep, street, number, complement, district, county, state, country,
        actuationFields, skills, experienceLevel,
        portifolioUrl, about, pictureUrl, password )
    {
        this.id = uuid.v1();
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.birthdate = birthdate;
        this.phoneList = new PhoneList( homePhone, workphone, whatsapp, ...otherPhones );
        this.socialMedias = new SocialMediaList( instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse )
        this.adress = new Adress( cep, street, number, complement, district, county, state, country );
        this.actuationFields = actuationFields;
        this.skills = skills;
        this.experienceLevel = experienceLevel;
        this.portifolioUrl = portifolioUrl;
        this.about = about;
        this.picture = pictureUrl;
        this.password = password;
    }
    
    static async save( professional ){
        //ToDo
        console.log( 'cliente Salvo')
    }

    static async loadById( id ){
        //ToDo
        return {};
    }

    static async loadByEmail( email ){
        //ToDo
        return {}
    };
};

const  generatePasswordHash = async ( password, saltRounds )=>{
    bcrypt.hash( password, saltRounds, ( err, hash )=>{
        if( err ) throw err;
        return hash;
    });
}