const { Router } = require( 'express' );
const controller = require( '../controllers/professional' );
const { checkProfessionalPassport  } = require( '../utils/authorization' );
const { professional: { chains : validationChains }, checkResults} = require( '../utils/inputValidator');

const router = Router();

router.post( '/',
    validationChains.insert,
    checkResults,    
    controller.post
);

router.get( '/',
    validationChains.selectAll,
    checkResults,
    controller.getAll );

router.get( '/:id', controller.get );

router.patch( '/:id', checkProfessionalPassport, controller.update );

router.delete( '/:id', checkProfessionalPassport, controller.delete );

module.exports = router;