var mongoose = require('mongoose');

var Users = mongoose.model('Users',{
    emailid :{
        type : String
    },
    password : {
        type : String
    },
    firstname : {
		type : String
	},
	lastname : {
        type : String
    },
    usertype : {
        type : String
    }
});

module.exports = {Users};