var mongoose = require('mongoose');

var SensorValues = mongoose.model('SensorValues',{
    sensorNodeId : {
        type : String
    },
    sensorName :{
        type : String
    },
    sensorValue :{
        type : String
    },
    timestamp1 : {
        type : String
    },
    timestamp2 : {
        type : String
    },
    smartNodeId : {
        type : String
    },
    clusterId : {
        type : String
    },
    sensorType : {
        type : String
    },
    latitude : {
        type : String
    },
    longitude : {
        type : String
    },
    sensorStatus : {
        type : String
    }
});

module.exports = {SensorValues};