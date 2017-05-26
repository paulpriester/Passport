var mongoose = require("mongoose");

var User = new mongoose.Schema({
	username: String,
	password: String

});

module.exports = mongoose.model("User", User);

// Making a model for the username and password and export the information to be used in other files