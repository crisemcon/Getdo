// routes to authenticate users
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddle');

//login
// api/auth

router.post('/', 
	authController.authenticateUser
);

//gets authenticated user
router.get('/',
	auth,
	authController.userAuth
)

module.exports = router;