var mongoose = require('mongoose');

var WindSpeedReadings = mongoose.model('WindSpeedReadings',{
    sensorid : {
        type : String
    },
    windspeed :{
        type : String
    },
    timestamp : {
        type : String
    }
	
});

module.exports = {WindSpeedReadings};