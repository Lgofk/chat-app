var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    avatar: {
        type: String,
        default: 'http://i.imgur.com/WRpRdkE.png'
    },
    name: String,
    username: {
        type: String,
        unique: true
    },
    password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);