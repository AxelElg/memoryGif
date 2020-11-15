const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	time: {
		type: String,
		required: true,
	},
	score: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
});

module.exports = item = mongoose.model('item', itemSchema);
