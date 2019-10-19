const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const InteractionTypeSchema = new Schema({
	label: {
		type: String,
	},
	created_on: {
		type: Date,
		trim: true,
		default: Date.now,

	},
	updated_on: {
		type: Date,
		trim: true,
		default: Date.now,

	}
});

module.exports = mongoose.model('InteractionType', InteractionTypeSchema)