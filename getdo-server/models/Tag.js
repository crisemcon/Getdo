const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	type: {
		type: String,
	},
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	created:{
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Tag', TagSchema);
