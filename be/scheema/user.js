const mongoose = require('mongoose');


const UserScheema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    isActive: Boolean
});

const User = mongoose.model('User', UserScheema);

module.exports = User;