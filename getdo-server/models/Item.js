const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	note: {
		type: String,
	},
	category: {
		type: String,
	},
	tags: {
		type: Array,
		default: [],
	},
	parent: {
		type: String,
		required: true,
	},
	focus: {
		type: Boolean,
	},
	done: {
		type: Boolean,
	},
	items: {/*
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Item'*/
		type: Array,
		default: [],
	},
	dueDate: {
		type: Date,
	},
	time: {
		type: Number,
	},
	energy: {
		type: String,
	},
	waiting: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tag',
	},
	schedule: {
		type: Date,
		default: null,
	},
	trash: {
		type: Boolean,
	},
	created:{
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Item', ItemSchema);
