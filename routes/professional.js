const { Router } = require( 'express' );
const controller = require( '../controllers/professional' );
const { body, validationResult } = require( 'express-validator' );
const validator = require( '../utils/validator');
const { professional: profKeys } = require( '../utils/variables' )

const router = Router();

// POST > /professionals
router.post(
    '/',
    body( profKeys.name ).isString().notEmpty().trim().blacklist(/[\<\>\/]/g),
    body( profKeys.email ).isString().notEmpty().trim().isEmail(),
    body( profKeys.cpf ).isNumeric(),
    body( profKeys.birthdate ).isDate({format: 'DD/MM/YYYY' }),
    body( profKeys.whatsapp ).isNumeric().isLength({ min: 8, max: 16 }),
    body( profKeys.homePhone ).isNumeric().isLength({ min: 8, max: 16 }),
    
    validator.professional,
    controller.post );

// GET /professionals/login
router.get( '/login', controller.login );

// GET /professionals/logout
router.get( '/logout', controller.logout );

// GET > /professionals
router.get( '/', controller.getAll );

//GET > /professional/:id
router.get( '/:id', controller.get );

//PATCH > /professional/:id
router.patch( '/:id', controller.patch );

//DELETE > /professional/:id
router.delete( '/:id', controller.delete );



module.exports = router;