const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ',
    },
});

module.exports = mongoose.model('Item', itemSchema);