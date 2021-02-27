/**
 * 
 * @param {String} string 
 */
const stringToDate = string =>{
    if( typeof string !== 'string' )
            return null;

    let regEx = /^\d{2}[-/ ,]\d{2}[-/ ,]\d{4}$/;
    let arr;

    if( regEx.test(string)){        
        arr = string.split(/[-/ ]/).map(el=>parseInt(el))
        return new Date( arr[2], arr[1]-1, arr[0]);
    }
    return null;
}

module.exports = {
    stringToDate
}