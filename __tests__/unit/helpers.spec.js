const helpers = require( '../../src/utils/helpers' );
const { isObject, modelMapper, generateValidationErrorMessage } = helpers;

describe('isObject funtion works as expected.', () => {
    it('return false when parameter is a primitive type', () => {
        expect( isObject( true )).toBe( false );
        expect( isObject( false )).toBe( false );
        expect( isObject( null )).toBe( false );
        expect( isObject( undefined )).toBe( false );
        expect( isObject( 1 )).toBe( false );
        expect( isObject( 0.25 )).toBe( false );
        expect( isObject( 'String' )).toBe( false );
        expect( isObject( Symbol('s'))).toBe( false );        
    }); 
    
    it('return false when parameter is ans Array or Set', () => {
        expect( isObject([ 1, 2, 3 ])).toBe( false );
        expect( isObject( new Set([ 1, 2, 3 ]))).toBe( false );
    });

    it('return false when parameter is NaN', () => {
        expect( isObject( 1 * 'two' )).toBe( false );
    });

    it('return true when parameter is an Object', () => {
        expect( isObject({ a: 'b' })).toBe( true );
    });    
});

describe('modelMapper function works as expected', () => {
    let model = { a: 1, b: 2, c: 3 };

    it('throws type error when model parameter is not an object', () => {
        let invalidTypes = [ "", true, false, null, undefined, 1, 0.25, [1, 2, 3 ], Symbol('a'), new Set([1,2,3]), 1 * 'two'];
        for( let t of invalidTypes ){
            expect(()=>modelMapper( t, [])).toThrow( TypeError );
        }
    });

    it('return must be equal to { b: 2 }', () => {        
        let properties = [ 'b' ];
        let property = 'b'
        let expected = { b: 2 }

        expect( modelMapper( model, properties )).toEqual( expected );    
        expect( modelMapper( model, property )).toEqual( expected );    
    });
    
    it('return must be equal to { b: 2 }', () => {       
        let properties = [ 'b' ];
        let property = 'b'
        let expected = { b: 2 }

        expect( modelMapper( model, properties )).toEqual( expected );    
        expect( modelMapper( model, property )).toEqual( expected );    
    });

    it('return must be equal to { c: 3 }', () => {       
        let properties = [ 'c', 'd', 'f' ];
        let property = 'c'
        let expected = { c: 3 }

        expect( modelMapper( model, properties )).toEqual( expected );    
        expect( modelMapper( model, property )).toEqual( expected );    
    });

    it('return must be equal to { a: 1, c:3 }', () => {       
        let properties = [ 'c', 'a', 'g', null ];
        let expected = { a: 1, c:3 }

        expect( modelMapper( model, properties )).toEqual( expected );    
    });

    it('return must be equal to { a: 1, b:2 }', () => {        
        let properties = [ 'b', 'a' ];
        let expected = { a:1, b:2 }

        expect( modelMapper( model, properties )).toEqual( expected );    
    });

    it('return must be an empty object.', () => {
        let expected = {}

        expect( modelMapper( model, 'foo' )).toEqual( expected );    
    });

    it('return must be an empty object.', () => {        
        let properties = [false, true, undefined, null, 'one' * 2];
        let expected = {}

        expect( modelMapper( model, properties )).toEqual( expected );    
    });  

    it('return must be equal the original model when properties parameter is not valid', () => {
        let invalidTypes = [ true, false, null, undefined, 1, 0.25, Symbol('a'), new Set([1,2,3]), 1 * 'two', new Object()];
        for( let t of invalidTypes ){
            expect( modelMapper( model, t )).toEqual( model );    
        }
    });    
});

describe('generateValidationErrorMessage function works as expected', () => {
    const EXISTS = 0, NOT_EMPTY = 1, IS_NUMERIC = 2, IS_ALPHA = 3,  IS_LENGTH = 4, IS_VALID_FORMAT = 5;

    it('throw error if "validationType" parameter is not valid', () => {
        let invalidTypes = [ -1, 6, true, false, null, undefined, 1.25, [1, 2, 3 ], Symbol('a'), new Set([1,2,3]), 1 * 'two', new Object()];        
        for( let t of invalidTypes ){
            if( typeof t === 'string' )
                continue;
            expect(()=>generateValidationErrorMessage( t ,[])).toThrowError('Can\'t generate a valid message');
        }
    });

    it('return message ["a" property is required.]', () => {
        expect( generateValidationErrorMessage( EXISTS, ['a'])).toMatch('\"a\" property is required.')
        expect( generateValidationErrorMessage( EXISTS, 'a')).toMatch('\"a\" property is required.')
    });

    it('return message ["a", "b" properties are required.]', () => {
        expect( generateValidationErrorMessage( EXISTS, ['a', 'b'])).toMatch('\"a\", \"b\" properties are required.')
    });

    it('return message ["a" property can\'t be an empty string.]', () => {
        expect( generateValidationErrorMessage( NOT_EMPTY, ['a'])).toMatch('\"a\" property can\'t be an empty string.')
        expect( generateValidationErrorMessage( NOT_EMPTY, 'a')).toMatch('\"a\" property can\'t be an empty string.')
    });

    it('return message ["a", "b", "c" properties can\'t be an empty string.]', () => {
        expect( generateValidationErrorMessage( NOT_EMPTY, ['a', 'b', 'c'])).toMatch('\"a\", \"b\", \"c\" properties can\'t be an empty string.')        
    });

    it('return message ["number" property can only contain numbers.]', () => {
        expect( generateValidationErrorMessage( IS_NUMERIC, ['number'])).toMatch('\"number\" property can only contain numbers.')
        expect( generateValidationErrorMessage( IS_NUMERIC, 'number')).toMatch('\"number\" property can only contain numbers.')
    });

    it('return message ["heigth", "speedLimit", "code" properties can only contain numbers.]', () => {
        expect( generateValidationErrorMessage( IS_NUMERIC, ["heigth", "speedLimit", "code"])).toMatch('\"heigth\", \"speedLimit\", \"code\" properties can only contain numbers.')        
    });

    it('return message ["channel" property can\'t contain special characters.]', () => {
        expect( generateValidationErrorMessage( IS_ALPHA, ['channel'])).toMatch('\"channel\" property can\'t contain special characters.')
        expect( generateValidationErrorMessage( IS_ALPHA, 'channel')).toMatch('\"channel\" property can\'t contain special characters.')
    });

    it('return message ["street", "district", "city", "country" properties can\'t contain special characters.]', () => {
        expect( generateValidationErrorMessage( IS_ALPHA, ["street", "district", "city", "country"]))
        .toMatch('\"street\", \"district\", \"city\", \"country\" properties can\'t contain special characters.')       
    });

    it('throw error when validationType = IS_VALID_FORMAT and options parameter is missing or invalid', () => {        
        let invalidTypes = ["", true, false, null, undefined, 1, 1.25, [1, 2, 3 ], Symbol('a'), new Set([1,2,3]), 1 * 'two'];         
        for( let t of invalidTypes ) {
            expect(()=>generateValidationErrorMessage( IS_VALID_FORMAT, ['adress'], t))
            .toThrowError('Can\'t generate a valid message');
        }

        for( let t of invalidTypes ) {
            expect(()=>generateValidationErrorMessage( IS_VALID_FORMAT, ['adress'], { format: t }))
            .toThrowError('Can\'t generate a valid message');
        }
    });

    it('return message ["firstname" property must be a valid string.]', ()=>{
        expect(generateValidationErrorMessage( IS_VALID_FORMAT, ['firstname'], { format: 'string' }))
        .toMatch('\"firstname\" property must be a valid string.');        
        expect(generateValidationErrorMessage( IS_VALID_FORMAT, 'firstname', { format: 'string' }))
        .toMatch('\"firstname\" property must be a valid string.');
    });

    it('return message ["birthdate", "expireAt" properties must be a valid Date.]', ()=>{
        expect(generateValidationErrorMessage( IS_VALID_FORMAT, ["birthdate", "expireAt"], { format: 'Date' }))
        .toMatch('\"birthdate\", \"expireAt\" properties must be a valid Date.');
    });  

    it('throw error if validationType = IS_LENGTH and options parameter is missing or invalid', () => {        
        let invalidTypes = ["", true, false, null, undefined, 1, 1.75, [1, 2, 3 ], Symbol('a'), new Set([1,2,3]), 1 * 'two', new Object()];  
        for( let t in invalidTypes ) {           
            expect(()=>generateValidationErrorMessage( IS_LENGTH, ['adress'], t ))
            .toThrowError('Can\'t generate a valid message');
        }
    });

    it('throw error if validationType = IS_LENGTH and options.length parameter is missing or invalid', () => {        
        let invalidTypes = ["","baa", "teste", true, false, null, undefined, [1, 2, 3 ], Symbol('a'), new Set([1,2,3]), 1 * 'two', new Object()]; 
       
        for( let t of invalidTypes ) {
            expect(()=>generateValidationErrorMessage( IS_LENGTH, ['adress'], { length: t }))
            .toThrowError('Can\'t generate a valid message');
        };
    });
    
    it('return message ["id" property must be 5 characters long.]', () => {
        expect(generateValidationErrorMessage(IS_LENGTH,["id"],{ length: 5 }))
        .toMatch("\"id\" property must be 5 characters long.")

        expect(generateValidationErrorMessage(IS_LENGTH,"id",{ length: '5' }))
        .toMatch("\"id\" property must be 5 characters long.")
    });

    it('return message ["firstname", "lastname",  property must be 16 characters long.]', () => {
        expect(generateValidationErrorMessage(IS_LENGTH,["firstname", "lastname"],{ length: 16 }))
        .toMatch("\"firstname\", \"lastname\" properties must be 16 characters long.");

        expect(generateValidationErrorMessage(IS_LENGTH,["firstname", "lastname"],{ length: "16" }))
        .toMatch("\"firstname\", \"lastname\" properties must be 16 characters long.");
    });

    it('return message ["code" property must be at least 1 character long.]', () => {
        expect(generateValidationErrorMessage(IS_LENGTH,["code"],{ length: { min: 1}}))
        .toMatch("\"code\" property must be at least 1 character long.")
        
        expect(generateValidationErrorMessage(IS_LENGTH,["code"],{ length: { min: '1'} }))
        .toMatch("\"code\" property must be at least 1 character long.")
    });

    it('return message ["productName" property must be at most 24 characters long.]', () => {
        expect(generateValidationErrorMessage(IS_LENGTH,["code"],{ length: { max: 24}}))
        .toMatch("\"code\" property must be at most 24 characters long.")
        
        expect(generateValidationErrorMessage(IS_LENGTH,["code"],{ length: { max: '24'}}))
        .toMatch("\"code\" property must be at most 24 characters long.")
    });1

    it('return message ["region", "postalCode" properties must be at least 1 and at most 3 characters long.]', () => {
        expect(generateValidationErrorMessage(IS_LENGTH,["region", "postalCode"],{ length: { min: 1, max: 3}}))
        .toMatch("\"region\", \"postalCode\" properties must be at least 1 and at most 3 characters long.")
        
        expect(generateValidationErrorMessage(IS_LENGTH,["region", "postalCode"],{ length: { min: '1', max: '3'}}))
        .toMatch("\"region\", \"postalCode\" properties must be at least 1 and at most 3 characters long.")
    });

    it('',()=>{
        let invalidTypes = ["baa", "teste", true, false, null, undefined, [1, 2, 3 ], Symbol('a'), new Set([1,2,3]), 1 * 'two', new Object()];
        for( let t of invalidTypes ){
            expect(()=>generateValidationErrorMessage(IS_LENGTH, ['a', 'b', 'c'], { length: { min: t, max: t}}))
            .toThrowError('Can\'t generate a valid message');
            
            expect(()=>generateValidationErrorMessage(IS_LENGTH, ['a', 'b', 'c'], { length: { min: t }}))
            .toThrowError('Can\'t generate a valid message');
            
            expect(()=>generateValidationErrorMessage(IS_LENGTH, ['a', 'b', 'c'], { length: { max: t }}))
            .toThrowError('Can\'t generate a valid message');
        }
    }) 
});