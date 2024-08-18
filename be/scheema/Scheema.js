const mongoose = require('mongoose');


 const watchSchema = new mongoose.Schema({
    name: String,
    image: String,
    rating: Number,
    price: Number,
    description: String,
    qoh: Number,
    isActive: Boolean,
    gender: String,
});

const Watch = mongoose.model('Watch', watchSchema);

module.exports = Watch;