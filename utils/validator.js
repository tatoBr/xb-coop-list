const { validationResult } = require( 'express-validator' );

module.exports = {
    professional( req, res, next ){
        const errors = validationResult( req );
        if( errors.isEmpty()) return next();
        res.status( 400 ).json({
            message: 'There are errors with your requisition.',
            content: errors.array()
        });
    }
}