module.exports = class Adress{
    constructor( cep, street, number, complement, district, county, state, country ){
        this.cep = cep;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.district = district;
        this.county = county;
        this.state = state;
        this.country = country;
    }    
}