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
     * @param { Adress } adress 
     * @param { Array } actuationfield 
     * @param { Array } skills 
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
        actuationfield, skills, experienceLevel,
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
        this.actuationfield = actuationfield;
        this.skills = skills;
        this.experienceLevel = experienceLevel;
        this.portifolioUrl = portifolioUrl;
        this.about = about;
        this.picture = pictureUrl;
        try {
            this.password = generatePasswordHash( password, saltrounds );            
        } catch (error) {
            throw error;
        }
    }
    
    static async save( professional ){
        //ToDo
        console.log( 'cliente Salvo')
    }

    static async load( id ){
        console.log( 'Cliente Carregado.')
        return {};
    }
}

const  generatePasswordHash = ( password, saltRounds )=>{
    bcrypt.hash( password, saltRounds, ( err, hash )=>{
        if( err ) throw err;
        return hash;
    });
}