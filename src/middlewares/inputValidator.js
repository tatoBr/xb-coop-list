const { body, param, validationResult } = require('express-validator');

const EXISTS = 0, NOT_EMPTY = 1, IS_ALPHA = 2, IS_NUMERIC = 3, IS_LENGTH = 4, IS_VALID_FORMAT = 5;

module.exports = {
    user: {
        post: [
            body('username')
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['username']))                
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['username']))
                .isAlpha('pt-BR', { ignore: '.-_0123456789' }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['username']))
                .isLength({ min: 3, max: 32 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['username'], { length: { min: 3, max: 32 } })),                
            body('email')
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['email']))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['email']))
                .isEmail().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, ['email'], { format: 'email' }))
                .normalizeEmail({ all_lowercase: true }),
            body('picture')
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['picture']))
                .isBase64().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, ['picture'], { format: 'base64 string.' })),                
            body(['firstname', 'lastname'])
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['firstname', 'lastname']))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['firstname', 'lastname']))
                .isAlpha('pt-BR', { ignore: ' \'.-_' }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['firstname', 'lastname']))
                .isLength({ min: 3, max: 32 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['firstname', 'lastname'], { length: { min: 3, max: 32 } }))
                .bail(),
            body('birthdate')
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['birthdate']))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['birthdate']))
                .isISO8601().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, ['birthdate'], { format: 'ISO 8601 format' })),
            body('cpf')
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['cpf']))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['cpf']))
                .isNumeric().bail()
                .withMessage(generateValidationErrorMessage(IS_NUMERIC, ['cpf']))
                .isLength(9).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['cpf'], { lenght: 8 })),
            body('password')
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['password']))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['password']))
                .isLength({ min: 8 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['password'], { length: { min: 8 } }))
                .isAlphanumeric()
                .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
                .withMessage('\"PASSWORD\" property must contain letters and numbers combined.')
                .bail()
        ],        
        patch: [
            body(['firstname', 'lastname'])
                .trim()
                .optional({ checkFalsy: true, nullable: true })
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['firstname', 'lastname']))
                .isAlpha('pt-BR', { ignore: ' .-_' }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['firstname', 'lastname']))
                .isLength({ min: 3, max: 32 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['firstname', 'lastname'], { lenght: { min: 3, max: 32 } })),
            body('picture')
                .optional({checkFalsy: true, nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['picture']))
                .isBase64().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, ['picture'], { format: 'base64 string' })),
            body('birthdate')
                .trim()
                .optional({checkFalsy: true, nullable: true })
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['birthdate']))
                .isISO8601().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, ['birthdate'], { format: 'ISO 8601 format' })),
        ],
        authenticate: [
            body('email')
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['email']))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['email']))
                .isEmail().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, ['email'], { format: 'email' }))
                .normalizeEmail({ all_lowercase: true }),
            body('password')
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['password']))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['password']))                
        ],
        logout: [
            body('id')
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['id']))
                .isUUID().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, ['id'], { format: 'uuid format' })),
        ]
    },
    adress: {
        post: [
            body('cep')
                .trim()
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['cep']))
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['cep']))
                .isNumeric().bail()
                .withMessage(generateValidationErrorMessage(IS_NUMERIC, ['cep']))
                .isLength(8).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['cep'], { length: 8 })),
            body(['street', 'district', 'county', 'state', 'country'])
                .trim()
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['street', 'district', 'county', 'state', 'country']))
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['street', 'district', 'county', 'state', 'country']))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['street', 'district', 'county', 'state', 'country']))
                .isLength({ min: 1, max: 48 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['street', 'district', 'county', 'state', 'country'], { lenght: { min: 1, max: 48 }})),
            body('complement')
                .optional({ checkFalsy:true, nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['complement']))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['complement'])),
            body('number')
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['number']))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['number']))
                .isNumeric().bail()
                .withMessage(generateValidationErrorMessage(IS_NUMERIC, ['number']))
                .isLength({ min: 0, max: 6 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['street', 'district', 'county', 'state', 'country'], { lenght: { min: 0, max: 6 } }))
        ],
        patch: [            
            body('cep')
                .optional({ checkFalsy: true, nullable: true })
                .trim()
                .notEmpty()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['cep']))
                .isNumeric()
                .withMessage(generateValidationErrorMessage(IS_NUMERIC, ['cep']))
                .isLength(8)
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['cep'], { length: 8 }))
                .bail(),
            body(['street', 'district', 'county', 'state', 'country'])
                .trim()
                .optional({ checkFalsy: true, nullable: true })
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['street', 'district', 'county', 'state', 'country']))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['street', 'district', 'county', 'state', 'country']))
                .isLength({ min: 1, max: 48 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['street', 'district', 'county', 'state', 'country'], { lenght: { min: 1, max: 48 }})),
            body('complement')
                .optional({ checkFalsy: true, nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['complement']))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['complement'])),
            body('number')
                .optional({ checkFalsy: true, nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['number']))
                .isNumeric().bail()
                .withMessage(generateValidationErrorMessage(IS_NUMERIC, ['number']))
                .isLength({ min: 0, max: 6 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['street', 'district', 'county', 'state', 'country'], { lenght: { min: 0, max: 6 } }))
        ],
    },
    phonelist: {
        post: [
            body('whatsapp')
                .exists().bail()
                .withMessage( generateValidationErrorMessage( EXISTS, ['whatsapp']))
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [ 'whatsapp' ]))
                .isNumeric().bail()
                .withMessage( generateValidationErrorMessage( IS_NUMERIC, ['whatsapp'])),
            body(['homephone', 'workphone'])
                .optional({ checkFalsy:true, nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, ['homephone', 'workphone']))
                .isNumeric().bail()
                .withMessage( generateValidationErrorMessage( IS_NUMERIC, ['homephone', 'workphone'])),
            body('otherphones')
                .optional({ nullable: true })                
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, ['otherphones'], { format: 'Array' }))
        ],
        patch: [            
            body('whatsapp')
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [ 'whatsapp' ]))
                .isNumeric().bail()
                .withMessage( generateValidationErrorMessage( IS_NUMERIC, ['whatsapp'])),
            body(['homephone', 'workphone'])
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, ['homephone', 'workphone']))
                .isNumeric().bail()
                .withMessage( generateValidationErrorMessage( IS_NUMERIC, ['homephone', 'workphone'])),
            body('otherphones')
                .optional({ nullable: true })                
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, ['otherphones'], { format: 'Array' }))
        ]
    },
    socialmedia: {
        post: [
            body( 'instagram' )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, ['instagram']))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, ['instagram'], { format: 'URL' })),
            body( 'facebook' )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, ['facebook']))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, ['facebook'], { format: 'URL' })),
            body( 'youtube' )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, ['youtube']))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, ['youtube'], { format: 'URL' })),
            body( 'twitter' )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, [ 'twitter' ]))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, [ 'twitter' ], { format: 'URL' })),
            body( 'linkedin' )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, ['linkedin']))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, [ 'linkedin' ], { format: 'URL' })),
            body('tiktok')
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['tiktok']))
                .isAlpha('pt-BR').bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['tiktok'])),
            body( 'clubhouse' )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['clubhouse']))
                .isAlpha('pt-BR').bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['clubhouse']))           
        ],
        patch:[
            
        ]
    },
    professional: {        
        post: [
            body( 'actuationFields' )
                .exists().bail()
                .withMessage( generateValidationErrorMessage( EXISTS, ['actuationFields']))             
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [ 'actuationFields' ], { format: 'Array' })),
            body( 'skills' )
                .exists().bail()
                .withMessage( generateValidationErrorMessage( EXISTS, ['skills']))             
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [ 'skills' ], { format: 'Array' })),
            body('experienceLevel')
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['experienceLevel']))                
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['experienceLevel']))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['experienceLevel']))
                .isLength({ min: 3, max: 32 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['experienceLevel'], { length: { min: 3, max: 32 } })),
            body('about')
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['about']))                
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['about']))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['about']))
                .isLength({ min: 10, max: 2000 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['about'], { length: { min: 10, max: 2000 } })),
            body( 'portifolioUrl' )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, ['portifolioUrl']))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, ['portifolioUrl'], { format: 'URL' })),
            body( 'status' )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, ['status']))
                .isAlpha().bail()
                .withMessage( generateValidationErrorMessage( IS_ALPHA, ['status']))
                .isLength( 3 ).bail()
                .withMessage( generateValidationErrorMessage( IS_LENGTH, ['status'], { lenght: 3 }))
        ],
        patch: [
            param( 'id' )
                .exists().bail()
                .withMessage(generateValidationErrorMessage(EXISTS, ['id']))
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['id']))
                .isUUID().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, ['id'], { format: 'uuid' })),
            body( 'actuationFields' )
                .optional({ nullable: true })             
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [ 'actuationFields' ], { format: 'Array' })),
            body( 'skills' )
                .optional({ nullable: true })             
                .isArray().bail()
                .withMessage(generateValidationErrorMessage(IS_VALID_FORMAT, [ 'skills' ], { format: 'Array' })),
            body('experienceLevel')
                .optional({ nullable: true })                
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['experienceLevel']))
                .isAlpha('pt-BR', { ignore: '.-_0123456789' }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['experienceLevel']))
                .isLength({ min: 3, max: 32 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['experienceLevel'], { length: { min: 3, max: 32 } })),
            body('about')
                .optional({ nullable: true })               
                .trim()
                .notEmpty().bail()
                .withMessage(generateValidationErrorMessage(NOT_EMPTY, ['about']))
                .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` }).bail()
                .withMessage(generateValidationErrorMessage(IS_ALPHA, ['about']))
                .isLength({ min: 10, max: 2000 }).bail()
                .withMessage(generateValidationErrorMessage(IS_LENGTH, ['about'], { length: { min: 10, max: 2000 } })),
            body( 'portifolioUrl' )
                .optional({ nullable: true })
                .trim()
                .notEmpty().bail()
                .withMessage( generateValidationErrorMessage( NOT_EMPTY, ['portifolioUrl']))
                .isURL().bail()
                .withMessage( generateValidationErrorMessage( IS_VALID_FORMAT, ['portifolioUrl'], { format: 'URL' }))
        ],
        getById: [
            param('id')
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