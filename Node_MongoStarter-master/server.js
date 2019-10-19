const env = process.env;
const config = require('./config/config.json')[env.NODE_ENV || 'dev'];
const PORT = env.PORT || 5000;
const cors = require('cors');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var swaggerJSDoc= require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');// swaggerDocument = require('./config/swagger.json');
const routes = require('./routes/routes') ;

let options = {
  swaggerDefinition: {
    info: {
      title: 'Hello World',
      version: '1.0.0',
      description: 'A sample API'
    },
    host: 'localhost:5000',
    basePath: '/'
  },
  apis: ['./routes/routes.js']
}


var spec = swaggerJSDoc(options);

const app = express();
app.use(cors());

mongoose.connect(config.MongoURI);
mongoose.Promise = global.Promise;

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
res.json({"Hello " : "Build REST API with node.js"});
});

app.get('/images/:imagename', function(req,res){
 
         res.sendFile('C:/images/'+req.params.imagename);

   
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
app.use('/api/v1', routes);

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});


// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Something looks wrong :( !!!"});

});


app.listen(PORT, console.log(`Server started on port ${PORT}`));