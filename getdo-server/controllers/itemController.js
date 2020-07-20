const Item = require('../models/Item');
const { validationResult } = require('express-validator');

exports.createItem = async(req,res) => {

	//revisar si hay errors
	const errors= validationResult(req);

	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()});
	}

	try {
		//create new item
		const item = new Item(req.body);

		//save creator via jwt
		item.user = req.user.id;
		item.save();
		res.json(item);

	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

//get all items from current user
exports.getItems = async (req,res) => {

	try {
		const items = await Item.find({user: req.user.id});
		res.json({items});
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

//actualiza un proyecto
exports.actualizarProyecto = async (req,res) => {
	//revisar si hay errors
	const errors= validationResult(req);

	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()});
	}

	//extraer la informacion del proyecto
	const {nombre} = req.body;
	const nuevoProyecto = {};
	if(nombre) {
		nuevoProyecto.nombre = nombre;
	}

	try {
		//revisar el id
		let proyecto = await Item.findById(req.params.id);
		//si el proyecto existe o no
		if(!proyecto) {
			return res.status(404).json({msg: 'Item no encontrado'});
		}

		//verificar el creador del proyecto
		if(proyecto.creador.toString() !== req.usuario.id){
			return res.status(401).json({msg: 'No Autorizado'});
		}

		//actualizar
		proyecto = await Item.findByIdAndUpdate({_id: req.params.id}, { $set: nuevoProyecto}, {new: true});
		
		res.json({proyecto});

	} catch (error) {
		console.log(error);
		res.status(500).send('Error en el servidor');
	}
}

//delete item by id
exports.deleteItem = async (req, res) => {
	try {
		//check id
		let item = await Item.findById(req.params.id);
		//check if item exists
		if(!item) {
			return res.status(404).json({msg: 'Item not found'});
		}

		//check creator of item
		if(item.user.toString() !== req.user.id){
			return res.status(401).json({msg: 'Not authorized'});
		}
		//delete item
		await Item.findOneAndRemove({_id: req.params.id});
		res.json({msg: 'Item deleted'})
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}