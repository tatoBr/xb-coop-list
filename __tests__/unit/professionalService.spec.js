jest.mock('../../src/database/index.js');
jest.mock('../../src/models/professional.js');
jest.mock('../../src/models/user.js');

const Service = require('../../src/services/professional')
const service = new Service();

const { responses } = require('../../src/utils/constants');

const data = {
    username:"Ricardo90",
    email:"Emmalee_Fisher33@yahoo.com",
    picture:"VGhpcyBpcyBhIGJhc2ljIGJhc2U2NCBwaWN0dXJlIGV4YW1wbGUK",
    firstname:"Katelynn",
    lastname:"Harvey",
    birthdate:"2021-02-20T09:04:48.000Z",
    cpf:"108498343",
    password:"1Ljo5vznJr25xzfGE5st3UJpTt5RxNBY",
    cep:"11651468",
    street: "Lindgren Cliff",
    complement: "",
    number:382,
    district:"Kozey Brook",
    county:"New Rogersborough",
    state:"Lake Gaetano",
    country:"VI",
    homephone:"12265986381",
    workphone:"",
    whatsapp:"19013664160",
    otherphones: ["14420764935","12257531821","13279152970"],
    instagram: "http://abe.biz",
    youtube:"https://rhianna.name",
    linkedin:"https://roslyn.biz",
    twitter:"https://einar.net",
    clubhouse:"JBOD",
    tiktok:"SCSI",
    actuationFields: ["Markets","Accounts","Creative","Response","Applications","Factors","Accountability","Identity"],
    skills: ["Forward","Investor","Future","International","District","Global","Product","Dynamic","Internal","Investor"],
    experienceLevel: "Architect",
    portifolioUrl: "https://bethany.info",
    about: "revolutionize B2C markets"
}

const defaultProfessional = {
    id: '43a778a4-8823-11eb-8dcd-0242ac130003',
    username: 'test1',
    email: 'email@test.com',
    picture: 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4g',
    birthdate: new Date().toISOString(),
    firstname: 'Firstname',
    lastname: 'LastName',
    cpf: '11111111111',
    password: 'abc123',
    id: '5c3e9ff6-88d1-11eb-8dcd-0242ac130003',
    actuationFields: ['field1', 'field2'],    
    skills: ['skill1','skill2', 'skill3'],
    experienceLevel: 'expert',
    portifolioUrl: 'www.test.com',
    about: 'some randon text',
    status:  'IN ANALYSIS'
}

test(`response message from professional's service.create() should be ${responses.USER_ALREADY_EXIST }`, async() => {
    let response = await service.create( defaultProfessional );    

    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response.message).not.toBeUndefined();
    expect(response).toHaveProperty('content');   
    expect(response.message).toMatch( responses.USER_ALREADY_EXIST );
});

test(`response message from professional's service.create() should be ${ responses.USER_SAVED }`, async() => {
    let response = await service.create( data );
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response.message).not.toBeUndefined();
    expect(response).toHaveProperty('content');    
    expect(response.content).not.toBeUndefined();       
    expect(response.message).toMatch( responses.USER_SAVED );
});

test(`response content from professional's service.create() should have all user's model properties`, async()=>{    
    let response = await service.create( data );
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response.message).not.toBeUndefined();
    expect(response).toHaveProperty('content');    
    expect(response.content).not.toBeUndefined();   
    
    user = response.content._values.user;     
    expect(user).toHaveProperty( 'username' );
    expect(user).toHaveProperty( 'email' );
    expect(user).toHaveProperty( 'picture' );
    expect(user).toHaveProperty( 'birthdate' );
    expect(user).toHaveProperty( 'firstname' );
    expect(user).toHaveProperty( 'lastname' );
    expect(user).toHaveProperty( 'cpf' );
    expect(user).toHaveProperty( 'accessLevel' );    
    expect(user).toHaveProperty( 'password' );
    expect(user).toHaveProperty( 'loginAttempts' );
    expect(user).toHaveProperty( 'loginWaitTime' );
});

test(`response message from professional's service.readById() should be ${responses.USER_NOT_FOUND }`,async () => {
    let response = await service.readById();
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response.message).toMatch( responses.USER_NOT_FOUND );
});

test(`response message from professional's service.readById() should be ${responses.USER_LOADED }`,async () => {
    let response = await service.readById( defaultProfessional.id );
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response.message).toMatch( responses.USER_LOADED );
});

test(`response message from professional's service.read() should be ${responses.USERS_LOADED }`,async () => {
    let response = await service.read();
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response.content).toHaveLength( 10 );
    expect(response.message).toMatch( responses.USERS_LOADED );
});

test(`response message from professional's service.update() should be ${responses.USER_NOT_FOUND }`,async () => {
    let response = await service.update(null, data );
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response.message).toMatch( responses.USER_NOT_FOUND );
});

test(`response message from professional's service.update() should be ${responses.USER_NOT_MODIFIED }`,async () => {
    let response = await service.update( defaultProfessional.id, {} );
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response.message).toMatch( responses.USER_NOT_MODIFIED );
});

test(`response message from professional's service.update() should be ${responses.USER_UPDATED }`,async () => {
    let response = await service.update( defaultProfessional.id, data);
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response.message).toMatch( responses.USER_UPDATED );
});

test(`response message from professional's service.delete() should be ${responses.USER_NOT_FOUND}`, async () => {
    let response = await service.delete();
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response?.content).toBeNull();

    expect(response.message).toMatch(responses.USER_NOT_FOUND);  
});

test(`response message from professional's service.delete() should be ${responses.USER_DELETED}`, async () => {
    let response = await service.delete( defaultProfessional.id );
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');    

    expect(response.message).toMatch(responses.USER_DELETED);  
});