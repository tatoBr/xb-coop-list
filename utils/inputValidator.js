const { body, validationResult } = require('express-validator');
const { professional: pk } = require('./variables' )

module.exports = {
    professional: {
        validationChain: [
            body( pk.name )
                .trim()
                .exists()
                .withMessage( `The field "${ pk.name }" is required.` )                                
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
            body([ pk.street, pk.district, pk.county, pk.state, pk.coutry, pk.experienceLevel ]) 
                .trim()
                .exists()
                .withMessage( `This field is required.` )                                
                .notEmpty()
                .withMessage( `This field can't be an empty string.` )                                
                .isAlpha( 'pt-BR', { ignore:  ` -ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` })
                .withMessage( `This field can't contain special characters`)
                .isLength({ min: 1, max: 48 })
                .withMessage( `This field must have between 1 and 48 characters` ),
            body( pk.number )
                .trim()
                .exists()
                .withMessage( `The field '${ pk.number}' is required.` )
                .isNumeric()
                .withMessage( `${ pk.number } can contain numeric characters only` )
                .isLength({ min:0, max: 6 })
                .withMessage( `${ pk.number } range must be 0-999.999.` ),
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
                .exists()
                .trim()
                .withMessage( `This field is required.` )                                
                .notEmpty()
                .withMessage( `This field can't be an empty string.` )                                
                .isAlpha( 'pt-BR', { ignore:  ` -ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` })
                .withMessage( `This field can't contain special characters`)
                .isLength({ min: 1, max: 2000 })
                .withMessage( `This field must have between 1 and 2000 characters` ),
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