const uuid = require( 'uuid' );
const pool = require('../database/db' );
const { professional : pk, responseMessages: messages } = require( '../utils/variables' );
const queryHelpers = require('../utils/queryHelpers' )

const Adress = require("./adress");
const PhoneList = require( "./phonelist" );
const SocialMediaList = require( "./socialMediaList" );

const THIS_TABLE = 'professionals';

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
        username, email, cpf, birthdate,
        whatsapp, homePhone = 0, workphone = 0, otherPhones,
        instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse,
        cep, street, adressNumber, complement, district, county, adressState, country,
        actuationFields, skills, experienceLevel,
        portifolioUrl, about, pictureUrl, userPassword
    ){
        this.id = uuid.v1();
        this.username = username;
        this.email = email;
        this.cpf = parseInt(cpf);
        this.birthdate = birthdate;
        this.phoneList = new PhoneList(
            (parseInt(homePhone) || 0),
            (parseInt(workphone) || 0),
            (parseInt(whatsapp) || 0),
            otherPhones
        );
        this.socialMedias = new SocialMediaList( instagram, facebook, youtube, tiktok, twitter, linkedin, clubhouse )
        this.adress = new Adress(
            cep,
            street,
            parseInt(adressNumber),
            complement,
            district,
            county,
            adressState,
            country
        );
        this.actuationFields = actuationFields;
        this.skills = skills;
        this.experienceLevel = experienceLevel;
        this.portifolioUrl = portifolioUrl;
        this.about = about;
        this.pictureUrl = pictureUrl;
        this.userPassword = userPassword;
    }
    
    /**
     * @param { Professional } professional 
     */
    static async save( professional ){
        try { 
            const selectQuery = queryHelpers.generateSelectQueryStr(
                THIS_TABLE,
                ["email","cpf"],
                ["email","cpf"],
                [professional.email, professional.cpf ]
            );
            
            const selectResult = await pool.query( selectQuery );    
                                
            if( selectResult.rows.length > 0 )
                return { message: messages.USER_ALREADY_EXIST, content: selectResult.rows[0] };       
            
            const insertQuery = queryHelpers.generateInsertQueryString( THIS_TABLE, professional, Object.keys( pk ));            
            const insertResult = await pool.query( insertQuery );

            return insertResult.rows[0];
        } catch (error) {
            throw error;
        }
    }

    /** 
     * @param {string[]} expression
     * @param {string[]} columns
     * @param {(number|boolean|string|array)[]} values 
     */
    static async load( expression, columns, values ){
        const selectQuery = queryHelpers.generateSelectQueryStr(
            THIS_TABLE, expression, columns, values            
        )        
        const selectResult = await pool.query( selectQuery );        
        return selectResult.rows?.[0];       
    }

    static async loadByEmail( email ){
        //ToDo
        return {}
    };
};