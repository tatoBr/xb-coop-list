module.exports = {
    locale: 'pt-BR',
    professionalStructure : {
        user: {
            id: 'id',
            username: 'username',
            email: 'email',
            picture: 'picture',
            firstname: 'firstname',
            lastname: 'lastname',
            birthdate: 'birthdate',
            cpf: 'cpf',
            password: 'password',
            accessLevel: 'accessLevel' 
        },
        adress: {
            cep: 'cep',
            street: 'street',
            number: 'number',
            complement: 'complement',
            district: 'district',
            county: 'county',
            state: 'state',
            country: 'country'
        },
        phonelist: {
            homephone: 'homephone',
            workphone: 'workphone',
            whatsapp: 'whatsapp',
            otherphones: 'otherphones',
        },
        socialmediaList: {
            instagram: 'instagram',
            facebook: 'facebook',
            youtube: 'youtube',
            tiktok: 'tiktok',
            twitter: 'twitter',
            linkedin: 'linkedin',
            clubhouse: 'clubhouse'
        },        
        actuationFields: 'actuationFields',
        skills: 'skills',
        experienceLevel: 'experienceLevel',
        portifolioUrl: 'portifolioUrl',
        about: 'about',
               
    },
    responseMessages: {
        USER_SAVED: 10,
        USER_LOADED: 11,
        USERS_LOADED: 12,
        USER_ALREADY_EXIST: 13,
        USER_NOT_FOUND: 14,
        PASSWORD_MISMATCH: 15,
        USER_AUTHENTICATED: 16,        
    },
    privateKey: "2812a7a341e863e76dad78e0ea8be22e",
    userAccessLevel: {
        owner: 'own',
        admin: 'adm',
        professional:'prf'
    }
}