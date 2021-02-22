module.exports = class PhoneList{
    constructor( home, work, whatsapp, others ){
        this.home = home;
        this.work = work;
        this.whatsapp = whatsapp;
        this.others = others.map( p => parseInt( p ) || 0 );
    };
}
