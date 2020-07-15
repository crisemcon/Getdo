// Route to create an user
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {check} = require('express-validator');

//Create an user
// api/users

router.post('/', 
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email','Enter a valid email').isEmail(),
		check('password','The password must be 6 characters minimum').isLength({min: 6})
	],
	userController.createUser,
);

module.exports = router;