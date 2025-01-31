const router = require('express').Router();
const UserController = require('../controllers/User.controller');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');

router
  
  .get('/refreshTokens', verifyRefreshToken, UserController.refreshTokens)

  .post('/signUp', UserController.signUp)
 
  .post('/signIn', UserController.signIn)

  .get('/signOut', UserController.signOut);

module.exports = router;
