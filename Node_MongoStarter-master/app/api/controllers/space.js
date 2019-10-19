const spaceModel = require('../models/space');
const userModel = require('../models/users');

module.exports = {
	getById: function (req, res, next) {
		console.log(req.body);
		spaceModel.findById(req.params.spaceId, function (err, space) {
			if (err) {
				next(err);
			} else {
				res.json({ status: "success", message: "space found!!!", data: { spaces: space } });
			}
		});
	},

	getspacebyuser: function(req, res, next) {
		//let offersList = [];


		spaceModel.find({user:req.params.userId}, function(err, spaces){
			if (err){
				next(err);
			} else{
		
				res.json({status:"success", message: "space by user list found!!!", data:spaces});
							
			}

		});
	},

	getAll: function (req, res, next) {
		//let spacesList = [];

		spaceModel.find({}, function (err, spaces) {
			if (err) {
				next(err);
			} else {
				/*	for (let space of spaces) {
						spacesList.push({id: space._id, name: space.name, released_on: space.released_on});
					}
				*/
				res.json({ status: "success", message: "spaces list found!!!", data: spaces });

			}

		});
	},

	updateById: function (req, res, next) {
		spaceModel.findByIdAndUpdate(req.params.spaceId, req.body, function (err, space) {

			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "space updated successfully!!!", data: space });
			}
		});
	},

	deleteById: function (req, res, next) {
		spaceModel.findByIdAndRemove(req.params.spaceId, function (err, space) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "space deleted successfully!!!", data: null });
			}
		});
	},

	create: function (req, res, next) {
	
//console.log(req.body.image);
var dateimage=Date.now();
var nomimage="C:\\images\\"+dateimage+".png";
console.log(nomimage)
require("fs").writeFile(nomimage, req.body.image, 'base64', function(err) {
	console.log(err);
  });
  req.body.image=dateimage+".png"

		spaceModel.create(req.body, function (err, result) {
			if (err)
				next(err);
			else {
				
				userModel.findByIdAndUpdate(result.user._id, { $push: { spaces: result._id } } , function (err2, result2) {
					if (err2)
						next(err2);
					else
					//	console.log(result2);
					res.json({ status: "success", message: "space added successfully!!!", data: result });
				})

			}

		});
	},

}					