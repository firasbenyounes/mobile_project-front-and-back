const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
const spaceController = require('../app/api/controllers/space');
const interactionController = require('../app/api/controllers/interaction');
const interactionTypeController = require('../app/api/controllers/interactionType');
const offerController = require('../app/api/controllers/offer');

const jwt = require('jsonwebtoken');				

function validateUser(req, res, next) {

    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user to request
        req.body.user = decoded.user;
        next();
      }
    });    
  }
  
//public
router.post('/user/register', userController.create);
router.post('/user/authenticate', userController.authenticate);
//private 
router.get('/user',validateUser, userController.getAll); 
router.get('/user/:userId',validateUser, userController.getById);
router.put('/user/:userId',validateUser, userController.updateById);
router.delete('/user/:userId',validateUser, userController.deleteById);

router.get('/offer',validateUser, offerController.getAll); 
router.get('/offer/:spaceId',validateUser, offerController.getAllbyspace); 
router.post('/offer/:spaceId',validateUser, offerController.create);
router.get('/offer/:offerId',validateUser, offerController.getById);
router.put('/offer/:offerId',validateUser, offerController.updateById);
router.delete('/offer/:offerId',validateUser, offerController.deleteById);

router.get('/space',validateUser, spaceController.getAll); 
router.get('/space/:userId',validateUser, spaceController.getspacebyuser); 
router.post('/space',validateUser, spaceController.create);
router.get('/space/:spaceId',validateUser, spaceController.getById);
router.put('/space/:spaceId',validateUser, spaceController.updateById);
router.delete('/space/:spaceId',validateUser, spaceController.deleteById);

router.get('/interaction',validateUser, interactionController.getAll); 
router.post('/interaction',validateUser, interactionController.create);
router.get('/interaction/:interactionId',validateUser, interactionController.getById);
router.put('/interaction/:interactionId',validateUser, interactionController.updateById);
router.delete('/interaction/:interactionId',validateUser, interactionController.deleteById);

router.get('/interactiontype',validateUser, interactionTypeController.getAll); 
router.post('/interactiontype',validateUser, interactionTypeController.create);
router.get('/interactiontype/:interactiontypeId',validateUser, interactionTypeController.getById);
router.put('/interactiontype/:interactiontypeId',validateUser, interactionTypeController.updateById);
router.delete('/interactiontype/:interactiontypeId',validateUser, interactionTypeController.deleteById);

router.post('/test', validateUser,

function(req, res, next) {		
      
          res.json({status: "success", data: req.body.user});
        
      });
module.exports = router;