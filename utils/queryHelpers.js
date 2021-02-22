const generateInsertStrFromPrimitive = ( primitive )=>{
    if( typeof primitive === 'string' )
        return `\'${primitive}\'`;
        
    else if( typeof primitive === 'number' || typeof primitive === 'boolean' )
        return `${primitive}`;

    else return '\'\'';
};

const generateInsertStrFromArray = ( arr )=>{
    if( !Array.isArray( arr )) throw new Error( 'parameter must be an Array');

    let inputStr = arr.map( element =>{
        if( element !== Object( element ))
        {
            if( typeof element === 'string' )
                return `"${element}"`;
        
            else if( typeof element === 'number' || typeof element === 'boolean' )
                return `${element}`;

            else return `""`;
        }           

        else if( Array.isArray( element ))
            return generateInsertStrFromArray( element );
        
        else if( typeof element === 'object' && element !== null )
            return generateInsertStrFromObject( element );
        
        else return `""`;
    }).join(', ');
    inputStr = inputStr.length > 0 ? inputStr : `""`;
    return `{${inputStr}}`;
};

const generateInsertStrFromObject = ( object )=>{
    if( typeof object !== 'object') throw new Error( 'parameter must be an object');

    let inputStr = Object.values( object ).map( element =>{
        if( Array.isArray( element ))
            return `\'${generateInsertStrFromArray( element )}\'`;
        
        else if( typeof element === 'object' && element !== null )
            return generateInsertStrFromObject( element );
        
        else if( element !== Object( element ))
            return generateInsertStrFromPrimitive( element );
        
        else return '\'\'';
    }).join(', ');
    inputStr = inputStr.length > 0 ? inputStr : `\'\'`;
    return inputStr;
}

const generateInsertQueryString = ( tableName, object, fields )  => {
    const values = generateInsertStrFromObject( object );    
    return `INSERT INTO ${tableName} (${fields.join(',')}) VALUES (${values}) RETURNING *;`;      
}

const generateSelectQueryStr = ( tableName, expression, columns, values ) => {
    let expStr = expression.length === 0 ? '*' : expression.length === 1 ? expression[0] : expression.join(', ');
    let conditionStr = ""
    for( let i = 0; i < columns.length; i++){
        let c = columns[i];
        let v = typeof values[i] ==='string' ? `'${values[i]}'`: `${values[i]}`        
        conditionStr += `${ c }=${ v } AND `
    }
    return `SELECT ${expStr} FROM ${tableName} WHERE ${ conditionStr } 1=1;`
}


module.exports = {
    generateInsertStrFromPrimitive,
    generateInsertStrFromArray,
    generateInsertStrFromObject,
    generateInsertQueryString,
    generateSelectQueryStr
}