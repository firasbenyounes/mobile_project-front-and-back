const interactionModel = require('../models/interaction');

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		interactionModel.findById(req.params.interactionId, function(err, interaction){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "interaction found!!!", data: interaction});
			}
		});
	},

	getAll: function(req, res, next) {
		//let interactionsList = [];

		interactionModel.find({}, function(err, interactions){
			if (err){
				next(err);
			} else{
			/*	for (let interaction of interactions) {
					interactionsList.push({id: interaction._id, name: interaction.name, released_on: interaction.released_on});
				}
			*/
				res.json({status:"success", message: "interactions list found!!!", data:interactions});
							
			}

		});
	},

	updateById: function(req, res, next) {
		interactionModel.findByIdAndUpdate(req.params.interactionId, req.body, function(err, interaction){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "interaction updated successfully!!!", data:interaction});
			}
		});
	},

	deleteById: function(req, res, next) {
		interactionModel.findByIdAndRemove(req.params.interactionId, function(err, interaction){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "interaction deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) {
		interactionModel.create(req.body, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "interaction added successfully!!!", data: result});
				  
				});
	},

}					