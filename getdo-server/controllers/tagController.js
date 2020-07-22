const Tag = require('../models/Tag');
const { validationResult } = require('express-validator');

exports.createTag = async(req,res) => {

	//revisar si hay errors
	const errors= validationResult(req);

	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()});
	}

	try {
		//create new item
		const tag = new Tag(req.body);

		//save creator via jwt
		tag.user = req.user.id;
		tag.save();
		res.json(tag);

	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

//get all items from current user
exports.getTags = async (req,res) => {

	try {
		const tags = await Tag.find({user: req.user.id});
		res.json({tags});
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

//actualiza un proyecto
exports.updateTag = async (req,res) => {
	//revisar si hay errors
	const errors= validationResult(req);

	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()});
	}

	/*//extraer la informacion del proyecto
	const {nombre} = req.body;
	const nuevoProyecto = {};
	if(nombre) {
		nuevoProyecto.nombre = nombre;
	}*/

	try {
		//revisar el id
		let tag = await Tag.findById(req.params.id);
		//si el proyecto existe o no
		if(!tag) {
			return res.status(404).json({msg: 'Tag not found'});
		}

		//verificar el creador del proyecto
		if(tag.user.toString() !== req.user.id){
			return res.status(401).json({msg: 'Not authorized'});
		}

		//actualizar
		tag = await Tag.findByIdAndUpdate({_id: req.params.id}, { $set: req.body}, {new: true});
		
		res.json({tag});

	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

//delete item by id
exports.deleteTag = async (req, res) => {
	try {
		//check id
		let tag = await Tag.findById(req.params.id);
		//check if tag exists
		if(!tag) {
			return res.status(404).json({msg: 'Tag not found'});
		}

		//check tag creator
		if(tag.user.toString() !== req.user.id){
			return res.status(401).json({msg: 'Not authorized'});
		}
		//delete tag
		await Tag.findOneAndRemove({_id: req.params.id});
		res.json({msg: 'Tag deleted'})
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}