exports.modelMapper = ( model, properties )=>{
    let mapped = {}
    for( let property of properties ){       
        if( property in model )
            mapped[property] = model[property]
    }
    return mapped;
}

exports.filterQueryParams = ( params = {}, properties= [])=>{
    let filteredProperties = []
    for( let key in params ){
        if( properties.includes( key )){ 
            filteredProperties.push( key );
            delete params[key];
        }
    }
    return filteredProperties;    
}