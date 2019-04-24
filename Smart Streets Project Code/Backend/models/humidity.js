var mongoose = require('mongoose');

var HumidityReadings = mongoose.model('HumidityReadings',{
    sensorid : {
        type : String
    },
    relativehumidity :{
        type : String
    },
    timestamp : {
        type : String
    }
	
});

module.exports = {HumidityReadings};