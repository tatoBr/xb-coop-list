module.exports = {
    locale: 'pt-BR',
    modelsStructure: {
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
            accessLevel: 'accessLevel',
            refreshToken: 'refreshToken',
            loginAttempts: 'loginAttempts',
            loginWaitTime: 'loginWaitTime' 
        },
        adress: {
            id: 'id',
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
            id: 'id',
            homephone: 'homephone',
            workphone: 'workphone',
            whatsapp: 'whatsapp',
            otherphones: 'otherphones',
        },
        socialmediaList: {
            id: 'id',
            instagram: 'instagram',
            facebook: 'facebook',
            youtube: 'youtube',
            tiktok: 'tiktok',
            twitter: 'twitter',
            linkedin: 'linkedin',
            clubhouse: 'clubhouse'
        },
        professional: {
            id: 'id',
            actuationFields: 'actuationFields',
            skills: 'skills',
            experienceLevel: 'experienceLevel',
            portifolioUrl: 'portifolioUrl',
            about: 'about',
            status: 'status' 
        }
    },
    professionalStructure : {
        id: 'id',
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
            accessLevel: 'accessLevel',
            refreshToken: 'refreshToken',
            loginAttempts: 'loginAttempts',
            loginWaitTime: 'loginWaitTime' 
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
        status: 'status',               
    },
    responseMessages: {
        USER_SAVED: 'USER SAVED SUCCESSFULLY',
        USER_NOT_SAVED: 'THE SERVER WAS UNABLE TO SAVE THE USER',
        USER_NOT_LOADED: 'THE SERVER WAS UNABLE TO LOAD THE USER',
        USER_LOADED: 'USER LOADED SUCCESSFULLY',
        USER_UPDATED: 'USER WAS UPDATED SUCCESSFULLY',
        USER_NOT_MODIFIED: 'USER HAS NOT BEEN MODIFIED',
        USERS_LOADED: 'USERS LOADED SUCCESSFULLY',
        NO_USER_TO_LOAD: 'THERE ARE NO USERS SAVED IN THE DATA BASE',
        USER_DELETED: 'USER WAS DELETED FROM THE DATABASE',
        USER_LOGGED_OUT: 'USER LOGGED OUT FROM THE SYSTEM',
        USER_ALREADY_EXIST: 'USER ALREADY EXIST IN THE DATABASE',
        USER_NOT_FOUND: 'USER DON\'T EXIST IN THE DATABASE',
        PASSWORD_MISMATCH: 'WRONG PASSWORD',
        USER_AUTHENTICATED: 'USER AUTHENTICATED SUCCESSFULLY.',
        USER_IN_WAIT_TIME: 'TOO MANY FAILED LOGIN TRIES. WAIT FOR A FEW MINUTES AND TRY AGAIN.',       
        UNAUTHORIZED: 'MISSING OR INVALID AUTHORIZATION HEADER.',
        ACCESS_TOKEN_GENERATED:'SUCCESSFULLY GENERATED AN ACCESS TOKEN'      
    },
    privateKey: "2812a7a341e863e76dad78e0ea8be22e",
    userAccessLevel: {
        owner: 'own',
        admin: 'adm',
        professional:'prf'
    },
    professionalStatus: {
            INACTIVE : 'INACTIVE',
            ACTIVE: 'ACTIVE',
            IN_ANALYSIS: 'IN ANALYSIS'
    }
}