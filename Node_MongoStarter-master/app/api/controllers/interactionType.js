const interactionTypeModel = require('../models/interactionType');

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		interactionTypeModel.findById(req.params.interactionTypeId, function(err, interactionType){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "interactionType found!!!", data: interactionType});
			}
		});
	},

	getAll: function(req, res, next) {
		//let interactionTypesList = [];

		interactionTypeModel.find({}, function(err, interactionTypes){
			if (err){
				next(err);
			} else{
			/*	for (let interactionType of interactionTypes) {
					interactionTypesList.push({id: interactionType._id, name: interactionType.name, released_on: interactionType.released_on});
				}
			*/
				res.json({status:"success", message: "interactionTypes list found!!!", data:interactionTypes});
							
			}

		});
	},

	updateById: function(req, res, next) {
		interactionTypeModel.findByIdAndUpdate(req.params.interactionTypeId, req.body, function(err, interactionType){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "interactionType updated successfully!!!", data:interactionType});
			}
		});
	},

	deleteById: function(req, res, next) {
		interactionTypeModel.findByIdAndRemove(req.params.interactionTypeId, function(err, interactionType){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "interactionType deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) {
		interactionTypeModel.create(req.body, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "interactionType added successfully!!!", data: result});
				  
				});
	},

}					