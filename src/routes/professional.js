const { Router } = require( 'express' );
const Professional = require( '../models/professional' )
const User = require( '../models/user' );
const controller = require( '../controllers/professional' );
const { professionalStructure : ps } = require('../utils/variables')
const { checkProfessionalPassport  } = require( '../utils/authorization' );
const { professional: { chains : validationChains }, checkResults} = require( '../utils/inputValidator');
const paginate = require( '../utils/paginate' );

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