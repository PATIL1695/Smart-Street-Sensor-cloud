var mongoose = require('mongoose');

    Sensors = mongoose.model('Sensors',{
            sensorid :{
                type : String
             },
            sensortype : {
                type : String
             },
            sensorname : {
                type : String
            },
            sensorstatus : {
                type : String
            },
            installation_date : {
                type : String
            },
            nodeid : {
                type : String
            }	
});

module.exports = {Sensors};