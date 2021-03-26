const uuid = require('uuid');
const User = require('../../src/models/user');
jest.mock('../../src/models/user.js');
jest.mock('../../src/database/index.js');
const UserModel = require('../../src/models/user')

const Service = require('../../src/services/admin');
const service = new Service();

const { responses, userAccessLevel: { admin } } = require('../../src/utils/constants');

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
    password: 'abc123'
};

let data = {
    id: uuid.v1(),
    username: "Wayne34",
    email: "Broderick.Cormier77@hotmail.com",
    picture: "VGhpcyBpcyBhIGJhc2ljIGJhc2U2NCBwaWN0dXJlIGV4YW1wbGUK",
    firstname: "Alanis",
    lastname: "Hayes",
    birthdate: "2020-04-23T10:18:35.000Z",
    cpf: "74084316188",
    password: "3mDYCNkRjdWyGJR6o5qwJ63CHqzVnqs"
}

describe('Create Function works properly', () => {
    const { Op } = require('sequelize');
    let findOneMock = jest.spyOn(UserModel, 'findOne');
    let createMock = jest.spyOn(UserModel, 'create');    

    beforeEach(()=>{
        findOneMock.mockClear()
        createMock.mockClear()
    });

    it(`response message should be ${responses.USER_ALREADY_EXIST}`, async () => {
        let response = await service.create(defaultUser);

        expect(findOneMock).toBeCalledWith({
            where: {
                [Op.or]: [
                    { email: defaultUser.email },
                    { username: defaultUser.username },
                    { cpf: defaultUser.cpf }
                ]
            }
        });
        expect(findOneMock).toReturn()

        expect(response).not.toBeUndefined();

        expect(response).toHaveProperty('message');
        expect(response?.message).toMatch(responses.USER_ALREADY_EXIST);

        expect(response).toHaveProperty('content');
        expect(response?.content).toEqual(expect.objectContaining({
            id: '43a778a4-8823-11eb-8dcd-0242ac130003',
            username: 'test1',
            email: 'email@test.com',
            picture: 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4g',
            birthdate: expect.any(String),
            firstname: 'Firstname',
            lastname: 'LastName',
            cpf: '11111111111',
            accessLevel: 'adm',
        }));

        findOneMock.mockClear()
    });

    it(`response message should be ${responses.USER_SAVED}`, async () => {
        let response = await service.create( data )

        expect(findOneMock).toBeCalledWith({
            where: {
                [Op.or]: [
                    { email: data.email },
                    { username: data.username },
                    { cpf: data.cpf }
                ]
            }
        });
        expect(findOneMock).toReturnTimes(1);

        expect( createMock ).toBeCalledWith(
            {
                username: data.username,
                email: data.email,
                picture: data.picture,
                firstname: data.firstname,
                lastname: data.lastname,
                birthdate: data.birthdate,
                cpf: data.cpf,
                password: expect.any(String),
                accessLevel: admin,
                loginAttempts: 0,
                loginWaitTime: expect.any( Date )
            },
            {
                transaction: expect.anything()
            }
        );
        expect( createMock ).toReturnTimes(1);        

        expect(response).not.toBeUndefined();

        expect(response).toHaveProperty('message');
        expect(response?.message).toMatch(responses.USER_SAVED);

        expect(response).toHaveProperty('content');
        expect(response?.content).toEqual( expect.objectContaining({
            username: data.username,
            email: data.email,
            picture: data.picture,
            firstname: data.firstname,
            lastname: data.lastname,
            birthdate: data.birthdate,
            cpf: data.cpf,
            password: expect.any(String),
            accessLevel: admin,
            loginAttempts: 0,
            loginWaitTime: expect.any( Date )
        }));

        findOneMock.mockClear();
        createMock.mockClear();
    });

    it('should throw an error', async() => {        
        await expect( 
            async()=> await service.create( noExistingData )).rejects.toThrow();
    });    
});

describe('readById Function works properly', () => {
    let findByPkMock = jest.spyOn( UserModel, 'findByPk');

    it(`response message should be ${responses.USER_NOT_FOUND} when id parameter is invalid`, async()=>{
        let invalidTypes = [ "IdThatDoNotExist", 1, 0.25, true, false, null, undefined, [1, 2, 3 ], Symbol('a'), new Set([1,2,3]), 1 * 'two', new Object()];
        
        for( let t of invalidTypes ){
            let response = await service.readById( t );
            expect( findByPkMock ).toBeCalledWith( t );
            expect( findByPkMock ).toReturnTimes( 1 );

            expect( response ).not.toBeUndefined();
            expect( response ).toHaveProperty('message');
            expect( response?.message ).toMatch( responses.USER_NOT_FOUND );
    
            expect( response ).toHaveProperty( 'content' );
            expect( response?.content ).toBe( undefined );
            
            findByPkMock.mockClear();
        }       
    });

    it(`response message should be ${ responses.USER_LOADED }`, async() => {
        let response = await service.readById( defaultUser.id );
        
        expect( findByPkMock ).toBeCalledWith( defaultUser.id );
        expect( findByPkMock ).toReturnTimes( 1 );

        expect( response ).not.toBeUndefined();

        expect( response ).toHaveProperty('message');
        expect( response?.message ).toMatch( responses.USER_LOADED );
        
        expect( response ).toHaveProperty('content');        
        expect( response?.content ).toEqual( expect.objectContaining({     
            id: '43a778a4-8823-11eb-8dcd-0242ac130003',
            username: 'test1',
            email: 'email@test.com',
            picture: 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4g',
            birthdate: expect.any( String ),
            firstname: 'Firstname',
            lastname: 'LastName',
            cpf: '11111111111',
            accessLevel: 'adm',
            password: '$2y$10$7IQlYvgioAh5a8c0xBYDaO/pkrFUIPYVaTduUvTm274k3vWXPmgtm',
            refreshToken: '',
            loginAttempts: 0,
            loginWaitTime: expect.any(Date)       
        }));
    });

    findByPkMock.mockClear();    
});

describe('update Function works properly', () => {
    let findByPkMock = jest.spyOn( UserModel, 'findByPk');
    let saveMock = jest.spyOn( UserModel, 'save' );    
    
    beforeEach(()=>{
        findByPkMock.mockClear();
        saveMock.mockClear();       
    });

    it( `response message should be ${responses.USER_NOT_FOUND} when id parameter is not valid`, async() => {
        let invalidIds = [ "IdThatDoNotExist", 1, 0.25, true, false, null, undefined, [1, 2, 3 ], Symbol('a'), new Set([1,2,3]), 1 * 'two', new Object()];
        for( let id of invalidIds ){            
            let response = await service.update( id, { });

            expect( findByPkMock ).toBeCalledWith( id );
            expect( findByPkMock ).toReturnTimes( 1 );

            expect( response ).toBeTruthy();
            expect( response ).toHaveProperty( 'message' );
            expect( response?.message ).toMatch( responses.USER_NOT_FOUND );
            
            expect( response ).toHaveProperty( 'content' );
            expect( response?.content ).toBeNull();

            findByPkMock.mockClear();
        }
    });

    it( `response message should be ${ responses.USER_NOT_MODIFIED}`, async() => {
        let response = await service.update( defaultUser.id, { key: 'value' });

        expect( findByPkMock ).toBeCalledWith( defaultUser.id );
        expect( findByPkMock ).toReturnTimes( 1 );

        expect( response ).toBeTruthy();

        expect( response ).toHaveProperty( 'message' );
        expect( response?.message ).toMatch( responses.USER_NOT_MODIFIED );
        
        expect( response ).toHaveProperty( 'content' );
        expect( response?.content ).toBeNull();
        
    });

    it(`response message should be ${responses.USER_UPDATED}`, async () => {
        let response = await service.update(defaultUser.id, data);

        expect(response).toBeTruthy();

        expect( findByPkMock ).toBeCalledWith( defaultUser.id );
        expect( findByPkMock ).toReturnTimes( 1 );

        expect( saveMock ).toBeCalledTimes( 1 );
        expect( saveMock ).toReturnTimes( 1 );

        expect(response).toHaveProperty('message');
        expect(response.message).toMatch(responses.USER_UPDATED);

        expect(response).toHaveProperty('content');        
        expect(response?.content).toEqual( expect.objectContaining({
            id: expect.any( String ),
            username: 'Wayne34',
            email: 'Broderick.Cormier77@hotmail.com',
            picture: 'VGhpcyBpcyBhIGJhc2ljIGJhc2U2NCBwaWN0dXJlIGV4YW1wbGUK',
            birthdate: expect.any( String ),
            firstname: 'Alanis',
            lastname: 'Hayes',
            cpf: '74084316188',
            accessLevel: 'adm',
            password: '3mDYCNkRjdWyGJR6o5qwJ63CHqzVnqs',
            refreshToken: '',
            loginAttempts: 0,
            loginWaitTime: expect.any( Date ),
        }))
    });    
});

describe('delete Function works properly', () => {
    let findByPkMock = jest.spyOn( UserModel, 'findByPk' );
    let destroyMock = jest.spyOn( UserModel, 'destroy' );

    beforeAll(()=>{
        findByPkMock.mockClear();
        destroyMock.mockClear();
    })

    it(`response message should be ${responses.USER_NOT_FOUND}  when id parameter is not valid`, async () => {
        let invalidIds = [ "IdThatDoNotExist", 1, 0.25, true, false, null, undefined, [1, 2, 3 ], Symbol('a'), new Set([1,2,3]), 1 * 'two', new Object()];
        for( let id of invalidIds ){
            let response = await service.delete( id );
            
            expect( findByPkMock ).toBeCalledWith( id );
            expect( findByPkMock ).toReturnTimes( 1 );
            
            expect(response).toBeTruthy();
            
            expect(response).toHaveProperty('message');
            expect(response?.message).toMatch( responses.USER_NOT_FOUND );
            
            expect(response).toHaveProperty('content');
            expect(response?.content).toBeNull();

            findByPkMock.mockClear();
        }
    });

    it(`response message should be ${ responses.USER_DELETED }`, async () => {
        let response = await service.delete( defaultUser.id );

        expect( findByPkMock ).toBeCalledWith( defaultUser.id );
        expect( findByPkMock ).toReturnTimes( 1 );

        expect( destroyMock ).toBeCalledTimes(1)

        expect(response).toBeTruthy();

        expect(response).toHaveProperty('message');
        expect(response?.message).toMatch( responses.USER_DELETED );

        expect(response).toHaveProperty('content');
        expect(response?.content).toEqual( expect.objectContaining({
            id: expect.any( String ),
            username: 'test1',
            email: 'email@test.com',
            picture: 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4g',
            birthdate: expect.any( String ),
            firstname: 'Firstname',
            lastname: 'LastName',
            cpf: '11111111111',
            accessLevel: 'adm',
            password: '$2y$10$7IQlYvgioAh5a8c0xBYDaO/pkrFUIPYVaTduUvTm274k3vWXPmgtm',
            refreshToken: '',
            loginAttempts: 0,
            loginWaitTime: expect.any( Date )
        }));

        expect(response.message).toMatch(responses.USER_DELETED);
    });

});


