const express = require('express');
const router = express.Router();

const controller = require( '../controllers/user' );
const { user: { chains: validationChains }, checkResults } = require( '../utils/inputValidator');

router.patch('/login',
  validationChains.authentication,
  checkResults,
  controller.authenticate
);

router.patch(
  '/logout/:id',
  validationChains.logout,
  checkResults,
  controller.logout
);
router.get('/acesstoken/:id', controller.getAccessToken );

module.exports = router;
