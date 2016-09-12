var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Chat = new Schema({
    username: String,
    avatar: String,
    message: String,
    created: Date
});

module.exports = mongoose.model('messages', Chat);