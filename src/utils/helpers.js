const EXISTS = 0, NOT_EMPTY = 1, IS_ALPHA = 2, IS_NUMERIC = 3, IS_LENGTH = 4, IS_VALID_FORMAT = 5;

exports.isObject = (variable) => {
    return Object.prototype.toString.call(variable) === "[object Object]";
}

exports.modelMapper = (model, properties) => {
    if (!this.isObject( model ))
        throw new TypeError('Expect model parameter to be an object');
        
    let mapped = {};

    if ( Array.isArray( properties )) {
        for (let property of properties) {
            if ( property in model ) mapped[property] = model[property];            
        }
        return mapped;
    };

    if ( typeof properties === 'string' ) {
        if ( properties in model )
            mapped[properties] = model[properties];
        return mapped;
    };

    return model;
};

exports.generateValidationErrorMessage = ( validationType, fields, options = null ) => {

    let n;
    let fieldsStr;
    if ( typeof fields === 'string' ) {
        n = 1;
        fieldsStr = fields;
    }
    if ( Array.isArray(fields)) {
        n = fields.length;
        fieldsStr = fields.join('\", \"');
    }

    switch ( validationType ) {
        case 0:
            return `\"${fieldsStr}\" propert${n <= 1 ? "y is" : "ies are"} required.`;

        case 1:
            return `\"${fieldsStr}\" propert${n <= 1 ? "y" : "ies"} can't be an empty string.`;

        case 2:
            return `\"${fieldsStr}\" propert${n <= 1 ? "y" : "ies"} can only contain numbers.`;

        case 3:
            return `\"${fieldsStr}\" propert${n <= 1 ? "y" : "ies"} can't contain special characters.`;

        case 4:{
            if( !this.isObject( options ) || !options.hasOwnProperty('length'))
                throw new Error( 'Can\'t generate a valid message' );
            
            if( typeof options.length === 'string' && options.length !== '' ){
                options.length = parseInt( options.length );
                
                if( options.length !== options.length )
                    throw new Error( 'Can\'t generate a valid message' );                
            }
            if( typeof options.length === 'number' && options.length === options.length ){
                return `\"${fieldsStr}\" propert${n <= 1 ? "y" : "ies"} must be ${ options.length } character${ options.length > 1 ? 's' : ''} long.`; 
            }
            let minStr ="", maxStr="", endStr="";
            
            if( this.isObject( options.length )){ 
                let min, max;               
                if( options.length.hasOwnProperty('min')){
                    min = options.length.min
                    if( typeof min === 'string' )
                        min = parseInt( min );

                    if( typeof min === 'number' && min === min )
                        minStr = `at least ${min} `;                  
                }
                
                if( options.length.hasOwnProperty('max')){
                    max = options.length.max;
                    if( typeof max === 'string')
                        max = parseInt( max );
                    
                    if( typeof max === 'number' && max === max )
                        maxStr = `at most ${max} `
                    
                    if( minStr ) maxStr = 'and '+ maxStr; 
                }

                if( !minStr && !maxStr )
                    throw new Error( 'Can\'t generate a valid message' );

                let plural = ( min && max ) || min > 1 || max > 1 
                endStr = `character${plural ? 's' : ''} long.`
                return `\"${fieldsStr}\" propert${n <= 1 ? "y" : "ies"} must be ${minStr}${maxStr}${endStr}`;           
            }                
            throw new Error( 'Can\'t generate a valid message' );
        }

        case 5:{                        
            if( typeof options?.format === 'string' && options?.format !== '' )
                return `\"${fieldsStr}\" propert${n <= 1 ? "y" : "ies"} must be a valid ${ options?.format }.`;
            throw new Error( 'Can\'t generate a valid message' );
        }
        default:
            throw new Error( 'Can\'t generate a valid message' );          
    }
}

