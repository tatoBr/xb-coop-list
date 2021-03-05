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

router.get( '/:id',
    checkProfessionalPassport,
    controller.get );

router.patch( '/:id',
    checkProfessionalPassport,
    validationChains.patch,
    checkResults,
    controller.update );

router.delete(
    '/:id',
    checkProfessionalPassport,
    controller.delete
);
router.post( '/protected/:id', checkProfessionalPassport, ( req, res ) => res.send({message: 'this is a protected route'}))

module.exports = router;