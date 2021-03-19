jest.mock('../../src/models/user.js');
jest.mock('../../src/database/index.js');

const uuid = require( 'uuid' );
const Service = require( '../../src/services/admin');
const service = new Service();

const { responses } = require('../../src/utils/constants');

let defaultUser = {  
    id: '43a778a4-8823-11eb-8dcd-0242ac130003', 
    username: 'test1',
    email: 'email@test.com',
    picture: 'abc123',
    birthdate: new Date().toISOString(),
    firstname: 'Firstname',
    lastname: 'LastName',
    cpf: '11111111111',
    accessLevel: 'adm',
    password:'abc123'
};

let data = {  
    id: uuid.v1(), 
    username:"Wayne34",
    email:"Broderick.Cormier77@hotmail.com",
    picture:"VGhpcyBpcyBhIGJhc2ljIGJhc2U2NCBwaWN0dXJlIGV4YW1wbGUK",
    firstname:"Alanis",
    lastname:"Hayes",
    birthdate:"2020-04-23T10:18:35.000Z",
    cpf:"74084316188",
    password:"3mDYCNkRjdWyGJR6o5qwJ63CHqzVnqs"
}

test(`response message from service.create() should be ${responses.USER_ALREADY_EXIST }`, async() => {
    let response = await service.create( defaultUser );
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response.message).not.toBeUndefined();
    expect(response).toHaveProperty('content');   
    expect(response.message).toMatch( responses.USER_ALREADY_EXIST );
});

test(`response message from service.create() should be ${ responses.USER_SAVED }`, async() => {
    let response = await service.create( data );
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response.message).not.toBeUndefined();
    expect(response).toHaveProperty('content');    
    expect(response.content).not.toBeUndefined();       
    expect(response.message).toMatch( responses.USER_SAVED );
});

test(`response content from service.create() should have all user's model properties`, async()=>{    
    let response = await service.create( data );
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response.message).not.toBeUndefined();
    expect(response).toHaveProperty('content');    
    expect(response.content).not.toBeUndefined();   
    
    user = response.content._values; 
    expect(user).toHaveProperty( 'id' );
    expect(user).toHaveProperty( 'username' );
    expect(user).toHaveProperty( 'email' );
    expect(user).toHaveProperty( 'picture' );
    expect(user).toHaveProperty( 'birthdate' );
    expect(user).toHaveProperty( 'firstname' );
    expect(user).toHaveProperty( 'lastname' );
    expect(user).toHaveProperty( 'cpf' );
    expect(user).toHaveProperty( 'accessLevel' );
    expect(user).toHaveProperty( 'refreshToken' );
    expect(user).toHaveProperty( 'password' );
    expect(user).toHaveProperty( 'loginAttempts' );
    expect(user).toHaveProperty( 'loginWaitTime' );
});

test(`response message from service.readById() should be ${responses.USER_NOT_FOUND }`,async () => {
    let response = await service.readById();
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response.message).toMatch( responses.USER_NOT_FOUND );
});

test(`response message from service.readById() should be ${responses.USER_LOADED}`, async()=>{
    let response = await service.readById(defaultUser.id); 
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response?.content).not.toBeFalsy();   
    expect(response.message).toMatch( responses.USER_LOADED );
});

test(`response content from service.readById() should have all user's model properties`, async()=>{    
    let response = await service.readById(defaultUser.id);    
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response?.content).not.toBeFalsy();   
    expect(response.message).toMatch( responses.USER_LOADED );

    let user = response?.content?._defaults;
    expect(user).toHaveProperty( 'id' );
    expect(user).toHaveProperty( 'username' );
    expect(user).toHaveProperty( 'email' );
    expect(user).toHaveProperty( 'picture' );
    expect(user).toHaveProperty( 'birthdate' );
    expect(user).toHaveProperty( 'firstname' );
    expect(user).toHaveProperty( 'lastname' );
    expect(user).toHaveProperty( 'cpf' );
    expect(user).toHaveProperty( 'accessLevel' );
    expect(user).toHaveProperty( 'refreshToken' );
    expect(user).toHaveProperty( 'password' );
    expect(user).toHaveProperty( 'loginAttempts' );
    expect(user).toHaveProperty( 'loginWaitTime' );
});

test(`response message from service.update() should be ${responses.USER_NOT_FOUND}`, async () => {
    let response = await service.update( null, data );

    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response?.content).toBeNull();    
    expect(response.message).toMatch(responses.USER_NOT_FOUND);  
})

test(`response message from service.update() should be ${responses.USER_NOT_MODIFIED}`, async () => {
    let response = await service.update( defaultUser.id, {});
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response?.content).toBeNull();

    expect(response.message).toMatch(responses.USER_NOT_MODIFIED);  
});

test(`response message from service.update() should be ${responses.USER_UPDATED}`, async () => {
    let response = await service.update( defaultUser.id, data);
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response?.content).not.toBeFalsy();

    expect(response.message).toMatch(responses.USER_UPDATED);  
});

test(`response content from service.update() should have all user's model properties`, async()=>{    
    let response = await service.update( defaultUser.id, data);    
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response?.content).not.toBeFalsy();   
    expect(response.message).toMatch( responses.USER_UPDATED );

    let user = response?.content?._defaults;
    expect(user).toHaveProperty( 'id' );
    expect(user).toHaveProperty( 'username' );
    expect(user).toHaveProperty( 'email' );
    expect(user).toHaveProperty( 'picture' );
    expect(user).toHaveProperty( 'birthdate' );
    expect(user).toHaveProperty( 'firstname' );
    expect(user).toHaveProperty( 'lastname' );
    expect(user).toHaveProperty( 'cpf' );
    expect(user).toHaveProperty( 'accessLevel' );
    expect(user).toHaveProperty( 'refreshToken' );
    expect(user).toHaveProperty( 'password' );
    expect(user).toHaveProperty( 'loginAttempts' );
    expect(user).toHaveProperty( 'loginWaitTime' );
});

test(`response message from service.delete() should be ${responses.USER_NOT_FOUND}`, async () => {
    let response = await service.delete();
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');
    expect(response?.content).toBeNull();

    expect(response.message).toMatch(responses.USER_NOT_FOUND);  
});

test(`response message from service.delete() should be ${responses.USER_DELETED}`, async () => {
    let response = await service.delete( defaultUser.id );
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('message');
    expect(response?.message).not.toBeFalsy();
    expect(response).toHaveProperty('content');    

    expect(response.message).toMatch(responses.USER_DELETED);  
});





