const router = require('express').Router();
const adminController = require( '../controllers/admin' );
const professionalController = require( '../controllers/professional');
const {
    user: validateUser,
    adress: validateAdress,
    phonelist: validatePhonelist,
    socialmedia: validateSocialMediaCatalog,
    professional: validadteProfessional,
    checkResults: checkValidationResults
} = require( '../middlewares/inputValidator' );

const { checkAdminPassport, verifyAuthorization } = require( '../middlewares/authorization' );

router.post( '/', verifyAuthorization, validateUser.post, checkValidationResults, adminController.post );

router.get( '/', verifyAuthorization, adminController.get );

router.patch( '/', verifyAuthorization, validateUser.patch, checkValidationResults, adminController.patch );

router.delete('/', verifyAuthorization, validateUser.authenticate, checkValidationResults, adminController.delete );


router.post(
    '/manage/professionals',
    verifyAuthorization,
    validateUser.post,
    validateAdress.post,
    validatePhonelist.post,
    validateSocialMediaCatalog.post,
    validadteProfessional.post,
    checkValidationResults,
    adminController.postProfessional
);

router.get( '/manage/professionals', verifyAuthorization, adminController.getProfessionals );

router.get( '/manage/professionals/:id', verifyAuthorization, validadteProfessional.getById, checkValidationResults, adminController.getProfessionalById );

router.patch(
    '/manage/professionals/:id',
    verifyAuthorization,
    validadteProfessional.getById,
    validateUser.patch,
    validateAdress.patch,
    validatePhonelist.patch,
    validateSocialMediaCatalog.patch,
    validadteProfessional.patch,
    checkValidationResults,
    adminController.patchProfessional
);

router.delete( '/manage/professionals/:id', verifyAuthorization, adminController.deleteProfessional );

module.exports = router;