const express = require('express');
const router = express.Router();

const controller = require( '../controllers/user' );
const { user: { chains: validationChains }, checkResults } = require( '../utils/inputValidator');

router.get('/login',
  validationChains.login,
  checkResults,
  controller.authenticate
);

router.get( '/logout/:id', controller.logout );
router.get('/acesstoken/:id', controller.getAccessToken );

module.exports = router;
