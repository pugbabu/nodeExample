var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/website');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    tel: Number,
    password: String
});
exports.user = db.model('users', userSchema);