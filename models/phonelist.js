module.exports = class PhoneList{
    constructor( home, work, whatsapp, ...args ){
        this.home = home;
        this.work = work;
        this.whatsapp = whatsapp;
        this.others = [ ...args ];
    };
}
