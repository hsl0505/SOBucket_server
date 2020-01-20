const express = require('express');

const router = express.Router();

const { userController } = require('../controller');

// * POST /user/avatar
router.post('/avatar', userController.avatar.post);

// * GET /user/info
router.get('/info', userController.info.get);

// * POST /user/info
router.post('/info', userController.info.post);

// * POST /user/login
router.post('/login', userController.login.post);

// * POST /user/logout
router.post('/logout', userController.logout.post);

// * POST /user/resign
router.post('/resign', userController.resign.post);

// * POST /user/signup
router.post('/signup', userController.signup.post);

module.exports = router;
