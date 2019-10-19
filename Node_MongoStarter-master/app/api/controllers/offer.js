const offerModel = require('../models/offer');
const spaceModel = require('../models/space');
module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		offerModel.findById(req.params.offerId, function(err, offer){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "offer found!!!", data: offer});
			}
		});
	},

	getAll: function(req, res, next) {
		//let offersList = [];

		offerModel.find({}, function(err, offers){
			if (err){
				next(err);
			} else{
			/*	for (let offer of offers) {
					offersList.push({id: offer._id, name: offer.name, released_on: offer.released_on});
				}
			*/
				res.json({status:"success", message: "offers list found!!!", data:offers});
							
			}

		});
	},

	getAllbyspace: function(req, res, next) {
		//let offersList = [];

		offerModel.find({spaces:req.params.spaceId}, function(err, offers){
			if (err){
				next(err);
			} else{
		
				res.json({status:"success", message: "offers by space list found!!!", data:offers});
							
			}

		});
	},

	updateById: function(req, res, next) {
		offerModel.findByIdAndUpdate(req.params.offerId, req.body, function(err, offer){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "offer updated successfully!!!", data:offer});
			}
		});
	},

	deleteById: function(req, res, next) {
		offerModel.findByIdAndRemove(req.params.offerId, function(err, offer){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "offer deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) {
		var dateimage=Date.now();
var nomimage="C:\\images\\"+dateimage+".png";
console.log(nomimage)
require("fs").writeFile(nomimage, req.body.image, 'base64', function(err) {
	console.log(err);
  });
  req.body.image=dateimage+".png"


		req.body.spaces=req.params.spaceId;
		offerModel.create(req.body, function (err, result) {
				  if (err) 
				  	next(err);
				  else{
					  console.log(req.params.spaceId)
					spaceModel.findByIdAndUpdate(req.params.spaceId, { $push: { offer: result._id } } , function (err2, result2) {
						if (err2)
						next(err2);
					else
				
				  	res.json({status: "success", message: "offer added successfully!!!", data: result});})}
				  
				});
	},

}					