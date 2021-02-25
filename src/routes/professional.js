const { Router } = require( 'express' );
const controller = require( '../controllers/professional' );
const { professional: authorize } = require( '../utils/authorization' );
const { professional : professionalValidator } = require( '../utils/inputValidator');

const router = Router();

router.post( '/',
    professionalValidator.chains.insert,
    professionalValidator.checkResults,
    controller.post
    );

router.get( '/login',
    professionalValidator.chains.login,
    professionalValidator.checkResults,
    controller.login
    );

router.get( '/logout', controller.logout );

//GET /professional/:id;
router.get('/:id', controller.get );

// GET > /professionals
router.get( '/', controller.getAll );

//GET > /professional/:id
router.get( '/:id', controller.get );

//PATCH > /professional/:id
router.patch( '/:id', authorize, controller.update );

//DELETE > /professional/:id
router.delete( '/:id', controller.delete );


module.exports = router;