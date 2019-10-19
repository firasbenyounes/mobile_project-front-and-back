const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
	country: String,
	city: String,
	street: String,
  });
   
const SpaceSchema = new Schema({
	label: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	address: AddressSchema,
	user: {
		ref: 'User',
		type: Schema.Types.ObjectId,
	  },
	offer: [{
		ref: 'Offer',
		type: Schema.Types.ObjectId,
	  }],
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


var autoPopulate = function(next) {
	this.populate('offer');

  next();
};

SpaceSchema.pre('findOne', autoPopulate).pre('find', autoPopulate);
module.exports = mongoose.model('Space', SpaceSchema)