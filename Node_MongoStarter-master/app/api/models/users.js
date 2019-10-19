const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;
const AddressSchema = new Schema({
	country: String,
	city: String,
	street: String,
  });
const UserSchema = new Schema({
	firstname:  String,
	lastname: String,
	role:{type:String, enum: ['responsable','client']},
	address: AddressSchema,
	email: {
		type: String,
		unique: true,
		required: true
	  },
	password:{
		type: String,
		required: true
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
	spaces:[{
		ref: 'Space',
		type: Schema.Types.ObjectId,
		}],
	// interactions:[{
	// 		ref: 'Interaction',
	// 		type: Schema.Types.ObjectId,
	// 		}],
});

var autoPopulate = function(next) {
	this.populate('spaces');
	// this.populate('interactions');
  next();
};

UserSchema.pre('findOne', autoPopulate).pre('find', autoPopulate);
	UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
this.updated_on = Date.now;
next();
});

module.exports = mongoose.model('User', UserSchema);