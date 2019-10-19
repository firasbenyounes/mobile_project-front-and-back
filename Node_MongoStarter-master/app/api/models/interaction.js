const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const InteractionSchema = new Schema({
	label: {
		type: String,
	},
	type: {
		ref: 'InteractionType',
		type: Schema.Types.ObjectId,
	  },
	  space: {
		ref: 'Space',
		type: Schema.Types.ObjectId,
	  },
	  user: {
		ref: 'User',
		type: Schema.Types.ObjectId,
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
});
var autoPopulate = function(next) {
	this.populate('space');
	this.populate('type');
	this.populate('user');
  next();
};

InteractionSchema.pre('findOne', autoPopulate).pre('find', autoPopulate);
module.exports = mongoose.model('Interaction', InteractionSchema)