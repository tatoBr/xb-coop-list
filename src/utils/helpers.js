const EXISTS = 0, NOT_EMPTY = 1, IS_ALPHA = 2, IS_NUMERIC = 3, IS_LENGTH = 4, IS_VALID_FORMAT = 5;

exports.modelMapper = ( model, properties )=>{
    if( Array.isArray(model) || model === null || typeof model !== 'object'){
        throw new Error( 'Expect model parameter to be an object' );
    }

    let mapped = {}
    if( Array.isArray( properties )){
        for( let property of properties ){
            if( property in model ){
                mapped[property] = model[property]
            }
        }
        return mapped;          
    }
    
    if( typeof properties === 'string' ){
        mapped[properties] = model[properties];
        return mapped;
    }
   
    return { ...model };
};

exports.filterQueryParams = ( params = {}, properties )=>{
    let filteredProperties = []
    for( let key in params ){
        if( properties.includes( key )){ 
            filteredProperties.push( key );
            delete params[key];
        }
    }
    return filteredProperties;    
};

exports.generateValidationErrorMessage = ( validationType, fields, options)=>{
    let n;
    let fieldsStr;
    if( typeof fields === 'string' ){
        n = 1;
    }
    else if( Array.isArray( fields )){
        n = fields.length;       
        fieldsStr = fields.join(', ');
        n = fields.length;
    }

    switch (validationType) {
        case 0:
            return `${fieldsStr} propert${n <= 1 ? "y is" : "ies are"} required.`;

        case 1:
            return `${fieldsStr} propert${n <= 1 ? "y" : "ies"} can't be an empty string.`;

        case 2:
            return `${fieldsStr} propert${n <= 1 ? "y" : "ies"} can only contain numbers.`;

        case 3:
            return `${fieldsStr} propert${n <= 1 ? "y" : "ies"} can't contain special characters`;

        case 4:
            let minStr = options?.length?.min ? `at least ${options?.length?.min} ` : "";
            let maxStr = options?.length?.max ? `and at most ${options?.length?.min} ` : "";
            let endStr = !minStr && !maxStr ? `${options.length} characters long.` : `characters long`;

            return `${fieldsStr} propert${n <= 1 ? "y" : "ies"} must be ${minStr}${maxStr}${endStr}`;

        case 5:
            return `${fieldsStr} propert${n <= 1 ? "y" : "ies"} must be a valid ${options.format}.`;
        default:
            break;
    }
}

