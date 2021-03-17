jest.setTimeout(30000)

const Service = require('./professional' );
const service = new Service();

const { responses } = require('../utils/constants');
const uuid = require( 'uuid');

let professional = JSON.parse(`{
    "username":"Carroll.Durgan",
    "email":"Green.Corkery@gmail.com",
    "picture":"VGhpcyBpcyBhIGJhc2ljIGJhc2U2NCBwaWN0dXJlIGV4YW1wbGUK",
    "firstname":"Rogelio",
    "lastname":"Strosin",
    "birthdate":"2020-04-22T03:44:29.000Z",
    "cpf":"187997381",
    "password":"3usQEuC7P37jiLSf7Rpp3zdSY528KoXpF",
    "cep":"17070701",
    "street": "Littel Ridges",
    "complement": "",
    "number":955,
    "district":"Liam Valley",
    "county":"Lake Sophiefort",
    "state":"East Marlon",
    "country":"TL",
    "homephone":"000",
    "workphone":"000",
    "whatsapp":"10913309193",
    "otherphones": ["19087742792"],
    "instagram": "https://alvera.biz",
    "youtube":"http://ferne.org",
    "linkedin":"http://marquise.org",
    "twitter":"https://marion.name",
    "clubhouse":"USB",
    "tiktok":"SMTP",
    "actuationFields": ["Brand","Optimization","Markets","Usability","Accounts","Markets","Creative"],
    "skills": ["Human","Investor","Direct","Senior"],
    "experienceLevel": "Orchestrator",
    "portifolioUrl": "http://hoyt.info",
    "about": "morph frictionless platforms"
}`);

test(`should receive \"${ responses.USER_SAVED }\" response after save a professional.`, async () => {
    let saveResult = await service.create( professional ); 
    let response = saveResult.message;
    let p = saveResult.content;
    professional.id = p.id;    
    
    expect( response ).toMatch( responses.USER_SAVED );
});

test(`should receive \"${ responses.USER_ALREADY_EXIST }\" response when trying to save a professional that already exists.`, async () => {
    let saveResult = await service.create( professional ); 
    let response = saveResult.message;
    
    expect( response ).toMatch( responses.USER_ALREADY_EXIST );
});

test(`should receive \"${ responses.USER_LOADED }\" response after load a professional.`, async () => {
    let selectResult = await service.readById( professional.id );
    let response = selectResult.message;
    
    expect( response ).toMatch( responses.USER_LOADED );
});

test(`reponse object must have a message and a content keys.`, async () => {
    let selectResult = await service.readById( professional.id );
    let keys = Object.keys( selectResult );
    
    expect( keys[0] ).toMatch( 'message' );
    expect( keys[1] ).toMatch( 'content' );
});

test(`should receive \"${ responses.USER_NOT_FOUND }\" response when tries to load a user by an id that does not exist in db.`, async () => {
    let selectResult = await service.readById( uuid.v1());
    let response = selectResult.message;
    
    expect( response ).toMatch( responses.USER_NOT_FOUND );
});

test(`should receive \"${ responses.USERS_LOADED }\" response after load a professional.`, async () => {
    let selectResult = await service.read();
    let response = selectResult.message;
    
    expect( response ).toMatch( responses.USERS_LOADED );
});

test(`should receive \"${ responses.USER_UPDATED }\" response after updates a professional.`, async () => {
    let data = { 
        firstname: 'UpdatedFrederik',
        lastname: 'UpdatedTromp'
    }
    let selectResult = await service.update(professional.id, data );
    let response = selectResult.message;
    
    expect( response ).toMatch( responses.USER_UPDATED );
});

test(`should receive \"${ responses.USER_NOT_MODIFIED }\" response after tries to update a professional with invalid data.`, async () => {
    let data = { foo: 'bar' };
    let selectResult = await service.update(professional.id, data );
    let response = selectResult.message;
    
    expect( response ).toMatch( responses.USER_NOT_MODIFIED );
});

test(`should receive \"${ responses.USER_NOT_FOUND }\" response when tries to delete a professional that not exists on db.`, async () => {
    let selectResult = await service.delete( uuid.v1());
    let response = selectResult.message;
    
    expect( response ).toMatch( responses.USER_NOT_FOUND );
});

test(`should receive \"${ responses.USER_DELETED }\" response after delete a professional.`, async () => {
    let selectResult = await service.delete( professional.id );
    let response = selectResult.message;
    
    expect( response ).toMatch( responses.USER_DELETED );
});



