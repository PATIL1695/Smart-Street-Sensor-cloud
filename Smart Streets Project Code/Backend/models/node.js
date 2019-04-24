var mongoose = require('mongoose');

var Nodes = mongoose.model('Nodes',{
    nodeid :{
        type : String
    },
    lat : {
        type : String
    },
    long : {
		type : String
	},
	node_status : {
        type : String
    },
    no_sensors : {
        type : String
    },
    installation_date : {
        type : String
    },
    clusterid : {
        type : String
    },
    installation_date : {
        type : String
    },
    updated_date : {
        type : String
    },
	
});

module.exports = {Nodes};