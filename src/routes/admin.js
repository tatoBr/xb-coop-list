const router = require('express').Router();
const controller = require( '../controllers/admin' );
const profController = require( '../controllers/professional')


const { checkResults: checkValidationResults, user: { chains: validationChains }, professional: { chains: prfValidationChains }} = require( '../utils/inputValidator' );
const { checkAdminPassport } = require( '../utils/authorization' );

// router.patch(
//     '/login',
//     validationChains.authentication,
//     checkResults,    
//     userController.authenticate
// );

// router.patch( '/logout/:id', userController.logout );

router.post( '/:id',
    checkAdminPassport,  
    validationChains.insert,    
    checkValidationResults,  
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
    validationChains.patch,
    checkValidationResults,
    controller.update
);

router.delete('/:id',
    checkAdminPassport,
    validationChains.authentication,
    checkValidationResults,
    controller.delete
);

router.post(
    '/:id/manage/professionals',
    checkAdminPassport,
    prfValidationChains.insert,
    checkValidationResults,
    profController.post
);

router.get(
    '/:id/manage/professionals',
    checkAdminPassport,
    controller.readAllProfessionals
);

router.get(
    '/:id/manage/professionals/:profId',
    checkAdminPassport,    
    controller.readProfessionalById,
);

router.patch(
    '/:id/manage/professionals/:profId',
    checkAdminPassport,
    prfValidationChains.patch,
    checkValidationResults,
    controller.updateProfessional
);

router.delete(
    '/:id/manage/professionals/:profId',
    controller.deleteProfessional
);

module.exports = router;