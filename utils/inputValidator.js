const { body, validationResult } = require('express-validator');
const { professional: pk } = require('./variables' )

module.exports = {
    login: {
        validationChain: [
            body( pk.email )
                .trim()
                .exists()
                .withMessage( `The field '${ pk.email }' is required.` )
                .isEmail()
                .withMessage( `This is not a valid email` ),
            body( pk.userPassword )
                .exists()
                .withMessage( `This field is required.` )                                
                .trim()            
                .notEmpty()
                .isLength({ min: 8 })
                .withMessage( 'Password must be at least 8 characters long.')
                .isAlphanumeric()              
        ]
    },
    professional: {
        validationChain: [
            body( pk.username )
                .trim()
                .exists()
                .withMessage( `The field "${ pk.username }" is required.` )                                
                .isAlpha('pt-BR', { ignore: ' .' })
                .withMessage('name can\'t contain special characters')
                .isLength({ min: 3, max: 32 })
                .withMessage( `name must have between 3 and 34 characters` ),
            body( pk.email )
                .trim()
                .exists()
                .withMessage( `The field '${ pk.email }' is required.` )
                .isEmail()
                .withMessage( `This is not a valid email` ),
            body( pk.cpf )
                .trim()
                .exists()
                .withMessage( `The field '${ pk.cpf }' is required.` )
                .isNumeric()
                .withMessage( `${ pk.cpf } can contain numeric characters only` )
                .isLength( 11 )
                .withMessage( `cpf must be 11 characters long`),
            body(pk.birthdate)
                .trim()
                .exists()
                .withMessage( `The field '${ pk.birthdate }' is required.` )
                .isDate({ format:  `DD/MM/YYYY` })
                .withMessage( `This is not a valid date format` ),
            body( pk.whatsapp )
                .trim()
                .exists()
                .withMessage( `The field '${ pk.whatsapp }' is required.` )
                .isNumeric()
                .withMessage( `${ pk.whatsapp } can contain numeric characters only` ),
            body([ pk.workPhone, pk.homePhone ])
                .trim()
                .optional({ checkFalsy: true, nullable: true })
                .isNumeric()
                .withMessage( `this field can contain numeric characters only` ),            
            body([pk.instagram, pk.facebook, pk.youtube, pk.tiktok, pk.twiter, pk.linkedin, pk.clubhouse ])
                .trim()
                .optional({ checkFalsy: true, nullable: true })               
                .isURL()
                .withMessage( `Social media links must be a valid URL.`),
            body( pk.cep )
                .trim()
                .exists()
                .withMessage( `The field '${ pk.cep }' is required.` )
                .isNumeric()
                .withMessage( `${ pk.cep } can contain numeric characters only` )
                .isLength( 8 )
                .withMessage( `${ pk.cep } must be 8 characters long`),
            body([ pk.street, pk.district, pk.county, pk.adressState, pk.coutry, pk.experienceLevel ]) 
                .trim()
                .exists()
                .withMessage( `This field is required.` )                                
                .notEmpty()
                .withMessage( `This field can't be an empty string.` )                                
                .isAlpha( 'pt-BR', { ignore:  ` -ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` })
                .withMessage( `This field can't contain special characters`)
                .isLength({ min: 1, max: 48 })
                .withMessage( `This field must have between 1 and 48 characters` ),
            body( pk.adressNumber )
                .trim()
                .exists()
                .withMessage( `The field '${ pk.adressNumber}' is required.` )
                .isNumeric()
                .withMessage( `${ pk.adressNumber } can contain numeric characters only` )
                .isLength({ min:0, max: 6 })
                .withMessage( `${ pk.adressNumber } range must be 0-999.999.` ),
            body([ pk.actuationFields, pk.skills ])
                .exists()
                .isArray()
                .withMessage( 'this field must be an array.'), 
            body([ pk.portifolioUrl, pk.pictureUrl ]) 
                .exists()
                .trim()
                .isURL()
                .withMessage( `this field must be a valid URL.`),
            body( pk.about )
                .trim()
                .exists()
                .withMessage( `This field is required.` )                                
                .notEmpty()
                .withMessage( `This field can't be an empty string.` )                                
                .isAlpha( 'pt-BR', { ignore:  ` -ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` })
                .withMessage( `This field can't contain special characters`)
                .isLength({ min: 1, max: 2000 })
                .withMessage( `This field must have between 1 and 2000 characters` ),
            body( pk.userPassword )
                .exists()
                .withMessage( `This field is required.` )                                
                .trim()            
                .notEmpty()
                .isLength({ min: 8 })
                .withMessage( 'Password must be at least 8 characters long.')
                .isAlphanumeric()
                .matches( /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/ )
                .withMessage( 'password must contain letters and numbers combined')
        ],  
        checkResults: (req, res, next) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) return next();
            res.status(400).json({
                message: 'There are errors in your requisition.',
                content: errors.array()
            });
        }
    }
}