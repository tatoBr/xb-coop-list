const { body, param, validationResult } = require('express-validator');
const { modelsStructure } = require('../utils/constants');
const { USER_ID, USERNAME, EMAIL, PICTURE, FIRSTNAME, LASTNAME, BIRTHDATE, CPF, PASSWORD } = modelsStructure.user;
const { ADRESS_ID, CEP, STREET, NUMBER, COMPLEMENT, DISTRICT, COUNTY, STATE, COUNTRY } = modelsStructure.adress;
const { PHONELIST_ID, WHATSAAPP, HOMEPHONE, WORKPHONE, OTHERPHONES } = modelsStructure.phonelist
const { SOCIALMEDIAS_ID, INSTAGRAM, FACEBOOK, YOUTUBE, TWITTER, LINKEDIN, TIKTOK, CLUBHOUSE } = modelsStructure.socialmediaList
const { PROFESSIONAL_ID, ACTUATION_FIELDS, SKILLS, EXPERIENCE_LEVEL, ABOUT, PORTIFOLIO_URL, STATUS } = modelsStructure.professional
const EXISTS = 0, NOT_EMPTY = 1, IS_ALPHA = 2, IS_NUMERIC = 3, IS_LENGTH = 4, IS_VALID_FORMAT = 5;

module.exports = {
    user: {
        post: [
            body(USERNAME)
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [USERNAME]))                
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [USERNAME]))
                .isAlpha('pt-BR', { ignore: '.-_0123456789' }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [USERNAME]))
                .isLength({ min: 3, max: 32 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [USERNAME], { length: { min: 3, max: 32 } })),                
            body(EMAIL)
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [EMAIL]))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [EMAIL]))
                .isEmail().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [EMAIL], { format: 'email' }))
                .normalizeEmail({ all_lowercase: true }),
            body(PICTURE)
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [PICTURE]))
                .isBase64().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [PICTURE], { format: 'base64 string.' })),                
            body([FIRSTNAME, LASTNAME])
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [FIRSTNAME, LASTNAME]))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [FIRSTNAME, LASTNAME]))
                .isAlpha('pt-BR', { ignore: ' \'.-_' }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [FIRSTNAME, LASTNAME]))
                .isLength({ min: 3, max: 32 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [FIRSTNAME, LASTNAME], { length: { min: 3, max: 32 } }))
                .bail(),
            body(BIRTHDATE)
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [BIRTHDATE]))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [BIRTHDATE]))
                .isISO8601().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [BIRTHDATE], { format: 'ISO 8601 format' })),
            body(CPF)
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [CPF]))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [CPF]))
                .isNumeric().bail()
                .withMessage(generateValidationErrorMessage(IS_NUMERIC, [CPF]))
                .isLength(9).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [CPF], { lenght: 8 })),
            body(PASSWORD)
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [PASSWORD]))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [PASSWORD]))
                .isLength({ min: 8 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [PASSWORD], { length: { min: 8 } }))
                .isAlphanumeric()
                .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
                .withMessage('\"PASSWORD\" property must contain letters and numbers combined.')
                .bail()
        ],        
        patch: [
            body([FIRSTNAME, LASTNAME])
                .trim()
                .optional({ checkFalsy: true, nullable: true })
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [FIRSTNAME, LASTNAME]))
                .isAlpha('pt-BR', { ignore: ' .-_' }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [FIRSTNAME, LASTNAME]))
                .isLength({ min: 3, max: 32 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [FIRSTNAME, LASTNAME], { lenght: { min: 3, max: 32 } })),
            body(PICTURE)
                .optional({checkFalsy: true, nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [PICTURE]))
                .isBase64().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [PICTURE], { format: 'base64 string' })),
            body(BIRTHDATE)
                .trim()
                .optional({checkFalsy: true, nullable: true })
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [BIRTHDATE]))
                .isISO8601().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [BIRTHDATE], { format: 'ISO 8601 format' })),
        ],
        authenticate: [
            body(EMAIL)
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [EMAIL]))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [EMAIL]))
                .isEmail().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [EMAIL], { format: 'email' }))
                .normalizeEmail({ all_lowercase: true }),
            body(PASSWORD)
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [PASSWORD]))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [PASSWORD]))                
        ],
        logout: [
            body(USER_ID)
                .trim()
                .notEmpty()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [USER_ID]))
                .isUUID()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [USER_ID], { format: 'uuid format' }))
                .bail(),
        ]
    },
    adress: {
        post: [
            body(CEP)
                .trim()
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [CEP]))
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [CEP]))
                .isNumeric().bail()
                .withMessage(generateValidationErrorMessage(IS_NUMERIC, [CEP]))
                .isLength(8).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [CEP], { length: 8 })),
            body([STREET, DISTRICT, COUNTY, STATE, COUNTRY])
                .trim()
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [STREET, DISTRICT, COUNTY, STATE, COUNTRY]))
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [STREET, DISTRICT, COUNTY, STATE, COUNTRY]))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [STREET, DISTRICT, COUNTY, STATE, COUNTRY]))
                .isLength({ min: 1, max: 48 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [STREET, DISTRICT, COUNTY, STATE, COUNTRY], { lenght: { min: 1, max: 48 } })),
            body(COMPLEMENT)
                .optional({ checkFalsy:true, nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [COMPLEMENT]))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [COMPLEMENT])),
            body(NUMBER)
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [NUMBER]))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [NUMBER]))
                .isNumeric().bail()
                .withMessage(generateValidationErrorMessage(IS_NUMERIC, [NUMBER]))
                .isLength({ min: 0, max: 6 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [STREET, DISTRICT, COUNTY, STATE, COUNTRY], { lenght: { min: 0, max: 6 } }))
        ],
        patch: [            
            body(CEP)
                .optional({ checkFalsy: true, nullable: true })
                .trim()
                .notEmpty()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [CEP]))
                .isNumeric()
                .withMessage(generateValidationErrorMessage(IS_NUMERIC, [CEP]))
                .isLength(8)
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [CEP], { length: 8 }))
                .bail(),
            body([STREET, DISTRICT, COUNTY, STATE, COUNTRY])
                .trim()
                .optional({ checkFalsy: true, nullable: true })
                .notEmpty()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [STREET, DISTRICT, COUNTY, STATE, COUNTRY]))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` })
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [STREET, DISTRICT, COUNTY, STATE, COUNTRY]))
                .isLength({ min: 1, max: 48 })
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [STREET, DISTRICT, COUNTY, STATE, COUNTRY], { lenght: { min: 1, max: 48 } }))
                .bail(),
            body(COMPLEMENT)
                .optional({ checkFalsy: true, nullable: true })
                .trim()
                .notEmpty()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [COMPLEMENT]))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` })
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [COMPLEMENT]))
                .bail(),
            body(NUMBER)
                .optional({ checkFalsy: true, nullable: true })
                .trim()
                .notEmpty()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [NUMBER]))
                .isNumeric()
                .withMessage(generateValidationErrorMessage(IS_NUMERIC, [NUMBER]))
                .isLength({ min: 0, max: 6 })
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [STREET, DISTRICT, COUNTY, STATE, COUNTRY], { lenght: { min: 0, max: 6 } }))
        ],
    },
    phonelist: {
        post: [
            body(WHATSAAPP)
                .exists().bail()
                .withMessage( generateValidationErrorMessage( EXISTS, [WHATSAAPP]))
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [ WHATSAAPP ]))
                .isNumeric().bail()
                .withMessage( generateValidationErrorMessage( IS_NUMERIC, [WHATSAAPP])),
            body([HOMEPHONE, WORKPHONE])
                .optional({ checkFalsy:true, nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [HOMEPHONE, WORKPHONE]))
                .isNumeric().bail()
                .withMessage( generateValidationErrorMessage( IS_NUMERIC, [HOMEPHONE, WORKPHONE])),
            body(OTHERPHONES)
                .optional({ nullable: true })                
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [OTHERPHONES], { format: 'Array' }))
        ],
        patch: [            
            body(WHATSAAPP)
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [ WHATSAAPP ]))
                .isNumeric().bail()
                .withMessage( generateValidationErrorMessage( IS_NUMERIC, [WHATSAAPP])),
            body([HOMEPHONE, WORKPHONE])
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [HOMEPHONE, WORKPHONE]))
                .isNumeric().bail()
                .withMessage( generateValidationErrorMessage( IS_NUMERIC, [HOMEPHONE, WORKPHONE])),
            body(OTHERPHONES)
                .optional({ nullable: true })                
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [OTHERPHONES], { format: 'Array' }))
        ]
    },
    socialmedia: {
        post: [
            body( INSTAGRAM )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [INSTAGRAM]))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, [INSTAGRAM], { format: 'URL' })),
            body( FACEBOOK )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [FACEBOOK]))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, [FACEBOOK], { format: 'URL' })),
            body( YOUTUBE )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [YOUTUBE]))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, [YOUTUBE], { format: 'URL' })),
            body( TWITTER )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [ TWITTER ]))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, [ TWITTER ], { format: 'URL' })),
            body( LINKEDIN )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [LINKEDIN]))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, [ LINKEDIN ], { format: 'URL' })),
            body(TIKTOK)
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [TIKTOK]))
                .isAlpha('pt-BR').bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [TIKTOK])),
            body( CLUBHOUSE )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [CLUBHOUSE]))
                .isAlpha('pt-BR').bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [CLUBHOUSE]))           
        ],
        patch:[
            
        ]
    },
    professional: {        
        post: [
            body( ACTUATION_FIELDS )
                .exists().bail()
                .withMessage( generateValidationErrorMessage( EXISTS, [ACTUATION_FIELDS]))             
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [ ACTUATION_FIELDS ], { format: 'Array' })),
            body( SKILLS )
                .exists().bail()
                .withMessage( generateValidationErrorMessage( EXISTS, [SKILLS]))             
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [ SKILLS ], { format: 'Array' })),
            body(EXPERIENCE_LEVEL)
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [EXPERIENCE_LEVEL]))                
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [EXPERIENCE_LEVEL]))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [EXPERIENCE_LEVEL]))
                .isLength({ min: 3, max: 32 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [EXPERIENCE_LEVEL], { length: { min: 3, max: 32 } })),
            body(ABOUT)
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [ABOUT]))                
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [ABOUT]))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [ABOUT]))
                .isLength({ min: 10, max: 2000 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [ABOUT], { length: { min: 10, max: 2000 } })),
            body( PORTIFOLIO_URL )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [PORTIFOLIO_URL]))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, [PORTIFOLIO_URL], { format: 'URL' })),
            body( STATUS )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [STATUS]))
                .isAlpha().bail()
                .withMessage( generateValidationErrorMessage( IS_ALPHA, [STATUS]))
                .isLength( 3 ).bail()
                .withMessage( generateValidationErrorMessage( IS_LENGTH, [STATUS], { lenght: 3 }))
        ],
        patch: [
            param( PROFESSIONAL_ID )
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, [SOCIALMEDIAS_ID]))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [SOCIALMEDIAS_ID]))
                .isUUID().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [SOCIALMEDIAS_ID], { format: 'uuid' })),
            body( ACTUATION_FIELDS )
                .optional({ nullable: true })             
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [ ACTUATION_FIELDS ], { format: 'Array' })),
            body( SKILLS )
                .optional({ nullable: true })             
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [ SKILLS ], { format: 'Array' })),
            body(EXPERIENCE_LEVEL)
                .optional({ nullable: true })                
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [EXPERIENCE_LEVEL]))
                .isAlpha('pt-BR', { ignore: '.-_0123456789' }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [EXPERIENCE_LEVEL]))
                .isLength({ min: 3, max: 32 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [EXPERIENCE_LEVEL], { length: { min: 3, max: 32 } })),
            body(ABOUT)
                .optional({ nullable: true })               
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, [ABOUT]))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, [ABOUT]))
                .isLength({ min: 10, max: 2000 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, [ABOUT], { length: { min: 10, max: 2000 } })),
            body( PORTIFOLIO_URL )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [PORTIFOLIO_URL]))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, [PORTIFOLIO_URL], { format: 'URL' }))
        ],
        getById: [
            param(USER_ID)
            .exists().bail()
            .isUUID().bail()
        ]       
    },
    checkResults: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) return next();
        res.status(400).json({
            message: 'There are errors in your requisition.',
            content: errors.array()
        });
    }
};

function generateValidationErrorMessage(validation, fields, options) {
    let fieldsStr = fields.join(', ')
    let n = fields.length;
    switch (validation) {
        case EXISTS:
            return `${fieldsStr} propert${n <= 1 ? "y is" : "ies are"} required.`;

        case NOT_EMPTY:
            return `${fieldsStr} propert${n <= 1 ? "y" : "ies"} can't be an empty string.`;

        case IS_NUMERIC:
            return `${fieldsStr} propert${n <= 1 ? "y" : "ies"} can only contain numbers.`;

        case IS_ALPHA:
            return `${fieldsStr} propert${n <= 1 ? "y" : "ies"} can't contain special characters`;

        case IS_LENGTH:
            let minStr = options?.length?.min ? `at least ${options?.length?.min} ` : "";
            let maxStr = options?.length?.max ? `and at most ${options?.length?.min} ` : "";
            let endStr = !minStr && !maxStr ? `${options.length} characters long.` : `characters long`;

            return `${fieldsStr} propert${n <= 1 ? "y" : "ies"} must be ${minStr}${maxStr}${endStr}`;

        case IS_VALID_FORMAT:
            return `${fieldsStr} propert${n <= 1 ? "y" : "ies"} must be a valid ${options.format}.`;
        default:
            break;
    }
}