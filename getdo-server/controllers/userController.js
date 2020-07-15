const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

	//check for errors
	const errores= validationResult(req);

	if(!errores.isEmpty()){
		return res.status(400).json({errores: errores.array()});
	}

	//extract email and password
	const {email, password} = req.body;

	try {
		//check that registered user is unique
		let user = await User.findOne({email});

		if(user){
			return res.status(400).json({msg: 'User already exists'});
		}

		//create new user
		user = new User(req.body);

		//hash password
		const salt = await bcryptjs.genSalt(10);
		user.password = await bcryptjs.hash(password, salt);


		//save user
		await user.save()

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

			//confirmation message
			res.json({token: token});

		});

	} catch (error) {
		console.log(error);
		res.status(400).send('There was an error');
	}
};
