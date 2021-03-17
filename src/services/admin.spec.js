jest.setTimeout(30000)

const Service = require('./admin' );
const service = new Service();

const { responses } = require('../utils/constants');
const uuid = require( 'uuid');

let testAdmin = {   
    "username":"admin",
    "email":"admin@email.com",
    "picture":"VGhpcyBpcyBhIGJhc2ljIGJhc2U2NCBwaWN0dXJlIGV4YW1wbGUK",
    "firstname":"Frederick",
    "lastname":"Kuhlman",
    "birthdate":"2020-10-19T18:32:15.000Z",
    "cpf":"68125997151",
    "password":"3GswfTpsZCWfFaccRhtRQgxu4Lf8xi"  
}

test(`should receive a "${ responses.USER_SAVED }" message after saves an admin on database.`, async () => {
    let createResult = await service.create( testAdmin );
    testAdmin.id = createResult.content.id;

    expect( createResult.message ).toMatch( responses.USER_SAVED );
});

test(`should receive a "${ responses.USER_ALREADY_EXIST }" message when tries to create an admin that already is on database.`, async () => {
    let createResult = await service.create( testAdmin );    

    expect( createResult.message ).toMatch( responses.USER_ALREADY_EXIST );
});

test(`should receive a "${ responses.USER_NOT_FOUND }" message when tries to read an admin by an id that don't exists on database.`, async () => {
    let readResult = await service.readById( uuid.v1() );    

    expect( readResult.message ).toMatch( responses.USER_NOT_FOUND );
});

test(`should receive a "${ responses.USER_LOADED }" message after reads an admin by an id that don't exists on database.`, async () => {
    let readResult = await service.readById( uuid.v1() );    

    expect( readResult.message ).toMatch( responses.USER_NOT_FOUND );
});

test(`should receive a "${ responses.USER_NOT_MODIFIED }" message after tries to update an admin with invalid data.`, async () => {
    let data = { foo: 'bar', bar: 'foo', undefined, n: null, arr: [] };
    let updateResult = await service.update( testAdmin.id, data );    

    expect( updateResult.message ).toMatch( responses.USER_NOT_MODIFIED );
});

test(`should receive a "${ responses.USER_NOT_FOUND }" message after tries to update an admin that do not exist on database.`, async () => {
    let data = {};
    let updateResult = await service.update( uuid.v1(), data );    

    expect( updateResult.message ).toMatch( responses.USER_NOT_FOUND );
});

test(`should receive a "${ responses.USER_UPDATED }" message after update an existig admin.`, async () => {
    let data = { firstname: 'Updated', lastname: 'Updated' };
    let updateResult = await service.update( testAdmin.id, data );    

    expect( updateResult.message ).toMatch( responses.USER_UPDATED );
});

test(`should receive a "${ responses.USER_DELETED }" message after delete an existing admin.`, async () => {
    let deleteResult = await service.delete( testAdmin.id );    

    expect( deleteResult.message ).toMatch( responses.USER_DELETED );
});

test(`should receive a "${ responses.USER_NOT_FOUND }" message when tries to delete an user that do not is saved on database.`, async () => {
    let deleteResult = await service.delete( testAdmin.id );    

    expect( deleteResult.message ).toMatch( responses.USER_NOT_FOUND );
});
