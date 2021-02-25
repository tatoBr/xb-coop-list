const queryHelpers = require( './queryHelpers' );

test(`receive a string. return must be equal ( \'value\' )`, ()=>{
    let value = "value"
    let expectedReturn = "\'value\'"
    expect(queryHelpers.generateInsertStrFromPrimitive(value)).toBe(expectedReturn);
});

test('receive a boolean. return must be equal ( true )',()=>{
    let value = true
    let expectedReturn = "true"
    expect(queryHelpers.generateInsertStrFromPrimitive(value)).toBe(expectedReturn);
});

test('receive a number. return must be equal ( 1 )',()=>{
    let value = 1
    let expectedReturn = "1"
    expect(queryHelpers.generateInsertStrFromPrimitive(value)).toBe(expectedReturn);
});

test( `receive an array of strings. return must be equal ( {"a", "b", "c"} )`,()=>{
    let value = ["a", "b", "c"];
    let expectedReturn = `{"a", "b", "c"}`;
    expect(queryHelpers.generateInsertStrFromArray(value)).toBe(expectedReturn);
});

test( `receive an array of numbers. return must be equal ( {1, 2, 3} )`,()=>{
    let value = [1, 2, 3];
    let expectedReturn = `{1, 2, 3}`;
    expect(queryHelpers.generateInsertStrFromArray(value)).toBe(expectedReturn);
});

test( `receive an array of booleans. return must be equal ( {true, true, false} )`,()=>{
    let value = [true, true, false];
    let expectedReturn = `{true, true, false}`;
    expect(queryHelpers.generateInsertStrFromArray(value)).toBe(expectedReturn);
});

test( `receive an array of arrays. return must be equal ( {{"a", "b"}, {"c", "d"}, {"e", "f"}} )`,()=>{
    let value = [["a","b"],["c","d"],["e","f"]];
    let expectedReturn = `{{"a", "b"}, {"c", "d"}, {"e", "f"}}`;
    expect(queryHelpers.generateInsertStrFromArray(value)).toBe(expectedReturn);
});

test( `receive an array of arrays. return must be equal ( {{1, 2}, {3, 4},  {5, 5}} )`,()=>{
    let value = [[1,2],[3,4],[5,6]];
    let expectedReturn = `{{1, 2}, {3, 4}, {5, 6}}`;
    expect(queryHelpers.generateInsertStrFromArray(value)).toBe(expectedReturn);
});

test( `receive an array of arrays. return must be equal ( {{""}, {""}, {""}} )`,()=>{
    let value = [[],[],[]];
    let expectedReturn = `{{""}, {""}, {""}}`;
    expect(queryHelpers.generateInsertStrFromArray(value)).toBe(expectedReturn);
});
