const router = require('express').Router();
const controller = require( '../controllers/admin' );
const userController = require( '../controllers/user')
const { checkResults, user: { chains: validationChains }} = require( '../utils/inputValidator' );
const { checkAdminPassport } = require( '../utils/authorization' );

router.patch(
    '/login',
    validationChains.authentication,
    checkResults,    
    userController.authenticate
);

router.patch( '/logout/:id', userController.logout );

router.post( '/:id',
    validationChains.insert,    
    checkResults,  
    checkAdminPassport,  
    controller.create
);

router.get(
    '/:id',
    checkAdminPassport,
    controller.read
);

router.patch(
    '/:id',
    checkAdminPassport,
    controller.update
);

router.delete('/:id',
    validationChains.authentication,
    checkResults,
    checkAdminPassport,
    controller.delete
);



module.exports = router;