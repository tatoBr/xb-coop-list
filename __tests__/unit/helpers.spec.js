const helpers = require( '../../src/utils/helpers' );

test('must throw \"Expect model parameter to be an object\" Error.',()=>{  
     
    let undefinedType = ()=>helpers.modelMapper( undefined );
    let nullType = ()=>helpers.modelMapper( null );
    let boolType = ()=>helpers.modelMapper( true );
    let numberType = ()=>helpers.modelMapper( 1 );
    let stringType = ()=>helpers.modelMapper( 'string' );
    let functionType = ()=>helpers.modelMapper( ()=>{} );
    let arrayType = ()=>helpers.modelMapper( [] );

    expect( undefinedType ).toThrow( 'Expect model parameter to be an object' );
    expect( nullType ).toThrow( 'Expect model parameter to be an object' );
    expect( boolType ).toThrow( 'Expect model parameter to be an object' );
    expect( numberType ).toThrow( 'Expect model parameter to be an object' );
    expect( stringType ).toThrow( 'Expect model parameter to be an object' );
    expect( functionType ).toThrow( 'Expect model parameter to be an object' );
    expect( arrayType ).toThrow( 'Expect model parameter to be an object' );
});

test('mapped model must be equal to {a:1, d:4}', () => {
    let model = {a:1, b:2, c:3, d:4 }
    let properties = ['d','a'];

    let received = helpers.modelMapper( model, properties )
    let expected = { a:1, d:4 };

    expect( received ).toEqual( expected );
});

test('mapped model must be equal to { a:1, b:2, c:3, d:4}',()=>{
    let model = {a:1, b:2, c:3, d:4 };
    let properties = 1;

    let received = helpers.modelMapper( model, properties )
    let expected = {a:1, b:2, c:3, d:4 };

    expect( expected ).toEqual( received );
});

test('mapped model must be equal to { c:3 }', ()=>{
    let model = {a:1, b:2, c:3, d:4 };
    let properties = 'c';

    let received = helpers.modelMapper( model, properties )
    let expected = { c:3 };

    expect( expected ).toEqual( received );
});

test('mapped model must be equal to {}', ()=>{
    let model = {a:1, b:2, c:3, d:4 };
    let properties = [null, undefined, true, 1, 'string', function(){}, []];

    let received = helpers.modelMapper( model, properties )
    let expected = {};

    expect( expected ).toEqual( received );
});
