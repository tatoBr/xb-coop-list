jest.setTimeout(30000)

const UserServices = require('./user' );
const userServices = new UserServices();

const AdminServices = require('./admin');
const adminServices = new AdminServices();

const { responses } = require('../utils/constants');
const uuid = require( 'uuid');

let testUser = {   
    "username":"userMaster",
    "email":"user@email.com",
    "picture":"VGhpcyBpcyBhIGJhc2ljIGJhc2U2NCBwaWN0dXJlIGV4YW1wbGUK",
    "firstname":"Marth",
    "lastname":"McFly",
    "birthdate":"2020-10-19T18:32:15.000Z",
    "cpf":"98765432198",
    "password":"3GswfTpsZCWfFaccRhtRQgxu4Lf8xi"  
}

test(`should receive a "${ responses.USER_SAVED }" message after saves an user on database.`, async () => {
    let createResult = await adminServices.create( testUser );
    testUser.id = createResult.content.id;

    expect( createResult.message ).toMatch( responses.USER_SAVED );
});

test(`should receive \"${ responses.USER_NOT_FOUND}\" message after tries to authenticate an user that do not exists on database` , async () => {
    let authResult = await userServices.authenticate('invalid@email.com', 'invalidPassword');
    expect(authResult.message ).toMatch( responses.USER_NOT_FOUND );   
});

test(`should receive \"${ responses.USER_AUTHENTICATED}\" message after tries to authenticate with a valid email and password` , async () => {
    let authResult = await userServices.authenticate( testUser.email, testUser.password );      
    expect(authResult.message ).toMatch( responses.USER_AUTHENTICATED );
});

test(`should receive a "${ responses.USER_DELETED }" message after delete an existing user.`, async () => {
    let deleteResult = await adminServices.delete( testUser.id );    

    expect( deleteResult.message ).toMatch( responses.USER_DELETED );
});




