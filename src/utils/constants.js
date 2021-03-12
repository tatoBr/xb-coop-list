module.exports = {
    locale: 'pt-BR',
    modelsStructure: {
        user: {
            USER_ID: 'id',
            USERNAME: 'username',
            EMAIL: 'email',
            PICTURE: 'picture',
            FIRSTNAME: 'firstname',
            LASTNAME: 'lastname',
            BIRTHDATE: 'birthdate',
            CPF: 'cpf',
            PASSWORD: 'password',
            ACCESS_LEVEL: 'accessLevel',
            REFRESH_TOKEN: 'refreshToken',
            LOGIN_ATTEMPTS: 'loginAttempts',
            LOGIN_WAIT_TIME: 'loginWaitTime' 
        },
        adress: {
            ADRESS_ID: 'id',
            CEP: 'cep',
            STREET: 'street',
            NUMBER: 'number',
            COMPLEMENT: 'complement',
            DISTRICT: 'district',
            COUNTY: 'county',
            STATE: 'state',
            COUNTRY: 'country'
        },
        phonelist: {
            PHONELIST_ID: 'id',
            HOMEPHONE: 'homephone',
            WORKPHONE: 'workphone',
            WHATSAAPP: 'whatsapp',
            OTHERPHONES: 'otherphones',
        },
        socialmediaList: {
            SOCIALMEDIAS_ID: 'id',
            INSTAGRAM: 'instagram',
            FACEBOOK: 'facebook',
            YOUTUBE: 'youtube',
            TIKTOK: 'tiktok',
            TWITTER: 'twitter',
            LINKEDIN: 'linkedin',
            CLUBHOUSE: 'clubhouse'
        },
        professional: {
            PROFESSIONAL_ID: 'id',
            ACTUATION_FIELDS: 'actuationFields',
            SKILLS: 'skills',
            EXPERIENCE_LEVEL: 'experienceLevel',
            PORTIFOLIO_URL: 'portifolioUrl',
            ABOUT: 'about',
            STATUS: 'status' 
        }
    },
    responses: {
        USER_SAVED: 'USER SAVED SUCCESSFULLY',
        USER_NOT_SAVED: 'THE SERVER WAS UNABLE TO SAVE THE USER',
        USER_NOT_LOADED: 'THE SERVER WAS UNABLE TO LOAD THE USER',
        USER_LOADED: 'USER LOADED SUCCESSFULLY',
        USER_UPDATED: 'USER WAS UPDATED SUCCESSFULLY',
        USER_NOT_MODIFIED: 'USER HAS NOT BEEN MODIFIED',
        USERS_LOADED: 'USERS LOADED SUCCESSFULLY',
        NO_USER_TO_LOAD: 'THERE ARE NO USERS SAVED IN THE DATA BASE',
        USER_DELETED: 'USER WAS DELETED FROM THE DATABASE',
        USER_LOGGED_IN: 'USER SUCCESSFULLY LOGGED IN',
        USER_LOGGED_OUT: 'USER LOGGED OUT FROM THE SYSTEM',
        USER_ALREADY_EXIST: 'USER ALREADY EXIST IN THE DATABASE',
        USER_NOT_FOUND: 'USER DON\'T EXIST IN THE DATABASE',
        PASSWORD_MISMATCH: 'WRONG PASSWORD',
        USER_AUTHENTICATED: 'USER AUTHENTICATED SUCCESSFULLY.',
        USER_IN_WAIT_TIME: 'TOO MANY FAILED LOGIN TRIES. WAIT FOR A FEW MINUTES AND TRY AGAIN',       
        UNAUTHORIZED: 'MISSING OR INVALID AUTHORIZATION HEADER',
        ACCESS_TOKEN_GENERATED:'SUCCESSFULLY GENERATED AN ACCESS TOKEN',
        NO_TOKEN_PROVIDED: 'THE REQUEST HEADER HAS NO ACCESS TOKEN IN IT'      
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
    },
    httpStatusCodes: {
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_CONTENT: 204,
        NOT_MODIFIED:304,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        INTERNAL_SERVER_ERROR: 500
    }
}