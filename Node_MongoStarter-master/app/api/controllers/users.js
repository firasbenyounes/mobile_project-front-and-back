const userModel = require('../models/users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');				

module.exports = {
	getById: function(req, res, next) {
		userModel.findById(req.params.userId, function(err, user){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "user found!!!", data: user});
			}
		});
	},

	getAll: function(req, res, next) {
		userModel.find({}, function(err, users){
			if (err){
				next(err);
			} else{
				res.json({status:"success", message: "users list found!!!", data: users});
							
			}

		});
	},

	updateById: function(req, res, next) {
		userModel.findByIdAndUpdate(req.params.userId, req.body , function(err, user){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "user updated successfully!!!", data:user});
			}
		});
	},

	deleteById: function(req, res, next) {
		movieModel.findByIdAndRemove(req.params.userId, function(err, user){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "user deleted successfully!!!", data:null});
			}
		});
	},
	//====================
	create: function(req, res, next) {
		 let errors = [];   
         if (!req.body.password || !req.body.email) {
				errors.push({ msg: 'Please enter all fields' });
			}
	    if(errors.length === 0){
		userModel.create(req.body, function (err, result) {
				  if (err) 
				  	next(err);
				  else
					res.json({status: "success", message: "User added successfully!!!", data: result});
						})
	    } else
	    res.json({status: "error", message: "Fields validations!!!", data: errors});	
	},

	authenticate: function(req, res, next) {
		userModel.findOne({email:req.body.email}, function(err, userInfo){
					if (err) {
						next(err);
					} else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

						 const token = jwt.sign({user: userInfo}, req.app.get('secretKey'), { expiresIn: '24h' }); 

						 res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});	

						}else{

							res.json({status:"error", message: "Invalid email/password!!!", data:null});

						}
					}
				});
	},

}					
