const { Router } = require( 'express' );
const controller = require( '../controllers/professional' );
const { checkProfessionalPassport  } = require( '../utils/authorization' );
const inputValidator = require( '../utils/inputValidator');

const router = Router();

router.post( '/',
    inputValidator.professional.chains.insert,
    inputValidator.checkResults,
    controller.post
);

router.get( '/', controller.getAll );

router.get( '/:id', controller.get );

router.patch( '/:id', checkProfessionalPassport, controller.update );

router.delete( '/:id', checkProfessionalPassport, controller.delete );

module.exports = router;