const { Router } = require( 'express' );
const controller = require( '../controllers/professional' );

const router = Router();

//>> POST > /professionals
router.post( '/', controller.post );

// GET > /professionals
router.get( '/', controller.getAll );

//GET > /professional/:id
router.get( '/:id', controller.get );

//PATCH > /professional/:id
router.patch( '/:id', controller.patch );

//DELETE > /professional/:id
router.delete( '/:id', controller.delete );



module.exports = router;