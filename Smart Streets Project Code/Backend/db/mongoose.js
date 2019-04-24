var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//var dbURI = 'mongodb://localhost:27017/HomeAway'
//var dbURI = 'mongodb://root:root123@ds157223.mlab.com:57223/cmpe281'
var dbURI = 'mongodb://amruta:amruta123@ds163226.mlab.com:63226/smartstreet'
//var dbURI = 'mongodb://narkesn:react1234@ds115154.mlab.com:15154/sensors'
mongoose.connect(dbURI, { poolSize: 10 });

mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + dbURI);
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
  });

module.exports = {mongoose};