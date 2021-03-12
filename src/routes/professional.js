const { Router } = require( 'express' );
const ProfessionalController = require( '../controllers/professional' );
const { verifyAuthorization } = require( '../middlewares/authorization' );
const {
    user: validateUser,
    adress: validateAdress,
    phonelist: validatePhonelist,
    socialmedia: validateSocialMediaList,
    professional: validateProfessional,
    checkResults
} = require( '../middlewares/inputValidator');

const router = Router();

router.post( '/',
    validateUser.post,
    validateAdress.post,
    validatePhonelist.post,
    validateSocialMediaList.post,
    validateProfessional.post,
    checkResults,    
    ProfessionalController.post
);

router.get( '/:id', ProfessionalController.get );

router.get( '/', ProfessionalController.getAll );

router.patch( '/', verifyAuthorization, ProfessionalController.patch );

router.delete('/', verifyAuthorization, ProfessionalController.delete );

module.exports = router;