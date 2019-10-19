const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
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

	},
	image: {
		type: String,
		required: true
	},

	spaces:{
		ref: 'Space',
		type: Schema.Types.ObjectId,
	  }
});

module.exports = mongoose.model('Offer', OfferSchema)