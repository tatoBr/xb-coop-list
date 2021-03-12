const express = require('express');
const router = express.Router();

const controller = require( '../controllers/user' );
const { verifyAuthorization } = require('../middlewares/authorization');
const { user: userInputValidator , checkResults } = require( '../middlewares/inputValidator');

router.patch('/login',
  userInputValidator.authenticate,
  checkResults,
  controller.login
);

router.patch('/logout', verifyAuthorization, controller.logout );
router.get('/acesstoken/:id', controller.getAccessToken );

module.exports = router;
