var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('user', new Schema({
	name: { type: String },
	password: { type: String },
	admin: { type: Boolean }
}));