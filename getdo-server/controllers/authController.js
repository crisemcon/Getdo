const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
	//check errors
	const errores= validationResult(req);

	if(!errores.isEmpty()){
		return res.status(400).json({errores: errores.array()});
	}

	//extract email and password
	const {email, password} = req.body;

	try {
		//check that the user is registered
		let user = await User.findOne({email});
		if(!user){
			return res.status(400).json({msg: 'User does not exist'});
		}
		//check password
		const isPasswordCorrect = await bcryptjs.compare(password, user.password);
		if(!isPasswordCorrect) {
			return res.status(400).json({msg: 'Incorrect password'});
		}

		//create and sign JWT
		const payload = {
			user: {
				id: user.id
			}
		};

		//sign token
		jwt.sign(payload, process.env.SECRETA, {
			expiresIn: 3600
		}, (error, token) => {
			if(error) throw error;

			//Mensaje de confirmacion
			res.json({token: token});

		});
	} catch (error) {
		console.log(error);
	}
}

//gets what user is authenticated
exports.userAuth = async (req,res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json({user});
	} catch (error) {
		console.log(error);
		res.status(500).json({msg: 'There was an error'});
	}
}