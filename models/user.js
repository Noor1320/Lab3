const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    githubId: String, // Store GitHub ID for OAuth login
    username: String,
    email: String,
});

userSchema.plugin(passportLocalMongoose); // Use passport-local-mongoose for local auth

module.exports = mongoose.model('User', userSchema);
