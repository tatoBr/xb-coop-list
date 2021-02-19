const { Router } = require( 'express' );
const controller = require( '../controllers/professional' );
const { professional : professionalValidator } = require( '../utils/inputValidator');

const router = Router();

// POST > /professionals
router.post(
    '/',
    professionalValidator.validationChain,
    professionalValidator.checkResults,
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