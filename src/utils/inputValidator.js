const { body, validationResult } = require('express-validator');
const { professionalStructure: ps } = require('./variables')

module.exports = {
    user: {
        chains: {
            login: [
                body(ps.user.email)
                    .trim()
                    .exists()
                    .withMessage(`The field '${ps.user.email}' is required.`)
                    .isEmail()
                    .withMessage(`This is not a valid email`),
                body(ps.user.password)
                    .exists()
                    .withMessage(`This field is required.`)
                    .trim()
                    .notEmpty()
            ]            
        }
    },
    professional: {
        chains: {
            insert: [
                body(ps.user.username)
                    .trim()
                    .exists()
                    .withMessage(`The field "${ps.user.username}" is required.`)
                    .isAlpha('pt-BR', { ignore: ' .-_0123456789' })
                    .withMessage('name can\'t contain special characters')
                    .isLength({ min: 3, max: 32 })
                    .withMessage(`name must have between 3 and 34 characters`),
                body(ps.user.email)
                    .trim()
                    .exists()
                    .withMessage(`The field '${ps.user.email}' is required.`)
                    .isEmail()
                    .withMessage(`This is not a valid email`),
                body(ps.user.picture)
                    .trim()
                    .isBase64()
                    .withMessage('It\'s not a valid base64 encoded string.'),
                body([ ps.user.firstname, ps.user.lastname ])
                    .trim()
                    .exists()
                    .withMessage(`The fields '${ps.user.firstname}' and '${ps.user.lastname}' are required.`)
                    .isAlpha('pt-BR', { ignore: ' .-_' })
                    .withMessage(`'${ps.user.firstname}' and '${ps.user.lastname}' fields can\'t contain special characters`)
                    .isLength({ min: 3, max: 32 })
                    .withMessage(`'${ps.user.firstname}' and '${ps.user.lastname}' fields must have between 3 and 34 characters`),
                body(ps.user.birthdate)
                    .trim()
                    .exists()
                    .withMessage(`The field '${ps.user.birthdate}' is required.`)
                    .isDate({ format: `DD/MM/YYYY` })
                    .withMessage(`This is not a valid date format`),
                body(ps.user.cpf)
                    .trim()
                    .exists()
                    .withMessage(`The field '${ps.user.cpf}' is required.`)
                    .isLength(9)
                    .withMessage('cpf must be nine characters long.'),
                body(ps.user.password)
                    .exists()
                    .withMessage(`This field is required.`)
                    .trim()
                    .notEmpty()
                    .isLength({ min: 8 })
                    .withMessage('Password must be at least 8 characters long.')
                    .isAlphanumeric()
                    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
                    .withMessage('password must contain letters and numbers combined'),
                body(ps.adress.cep)
                    .trim()
                    .exists()
                    .withMessage(`The field '${ps.adress.cep}' is required.`)
                    .isNumeric()
                    .withMessage(`${ps.adress.cep} must contain numeric characters only`)
                    .isLength(8)
                    .withMessage(`${ps.adress.cep} must be 8 characters long`),
                body([ps.adress.street, ps.adress.district, ps.adress.county, ps.adress.state, ps.adress.country])
                    .trim()
                    .exists()
                    .withMessage(`This field is required.`)
                    .notEmpty()
                    .withMessage(`This field can't be an empty string.`)
                    .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` })
                    .withMessage(`This field can't contain special characters`)
                    .isLength({ min: 1, max: 48 })
                    .withMessage(`This field must have between 1 and 48 characters.`),
                body(ps.adress.complement)
                    .trim()
                    .optional({ checkFalsy: true, nullable: true })
                    .isAlpha('pt-BR', { ignore: ` ._-ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` })
                    .withMessage(`This field can't contain special characters`),
                body(ps.adress.number)
                    .trim()
                    .exists()
                    .withMessage(`The field '${ps.adress.number}' is required.`)
                    .isNumeric()
                    .withMessage(`${ps.adress.number} can contain numeric characters only.`)
                    .isLength({ min: 0, max: 6 })
                    .withMessage(`${ps.adress.number} range must be 0-999.999.`),
                body([ps.phonelist.homephone, ps.phonelist.workphone])
                    .trim()
                    .optional({ checkFalsy: true, nullable: true })
                    .isNumeric()
                    .withMessage(`this field can contain numeric characters only.`),
                body(ps.phonelist.whatsapp)
                    .trim()
                    .exists()
                    .withMessage(`The field '${ps.phonelist.whatsapp}' is required.`)
                    .isNumeric()
                    .withMessage(`${ps.phonelist.whatsapp} can contain numeric characters only.`),
                body([
                    ps.socialmediaList.instagram,
                    ps.socialmediaList.facebook,
                    ps.socialmediaList.youtube,
                    ps.socialmediaList.linkedin,
                    ps.socialmediaList.twitter,
                ])
                    .trim()
                    .optional({ checkFalsy: true, nullable: true })
                    .isURL()
                    .withMessage(`Social media links must be a valid URL.`),
                body([ps.socialmediaList.clubhouse, ps.socialmediaList.tiktok])
                    .trim()
                    .optional({ checkFalsy: true, nullable: true }),
                body([ps.actuationFields, ps.skills])
                    .exists()
                    .isArray()
                    .withMessage('this field must be an array.'),
                body(ps.portifolioUrl)
                    .trim()
                    .exists()
                    .withMessage(`This field is required.`)
                    .isURL()
                    .withMessage(`portifolio link must be a valid URL.`),
                body(ps.about)
                    .trim()
                    .exists()
                    .withMessage(`This field is required.`)
                    .notEmpty()
                    .withMessage(`This field can't be an empty string.`)
                    .isAlpha('pt-BR', { ignore: ` -ñÑ@áéíóúÁÉÍÓÚãÃõÕ0123456789` })
                    .withMessage(`This field can't contain special characters`)
                    .isLength({ min: 1, max: 2000 })
                    .withMessage(`This field must have between 1 and 2000 characters`),
            ],
            login: [
                body(ps.user.email)
                    .trim()
                    .exists()
                    .withMessage(`The field '${ps.user.email}' is required.`)
                    .isEmail()
                    .withMessage(`This is not a valid email`),
                body(ps.user.password)
                    .exists()
                    .withMessage(`This field is required.`)
                    .trim()
                    .notEmpty()
                    .isAlphanumeric()
            ]
        },         
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