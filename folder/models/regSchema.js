const mongoose = require('mongoose');

const regSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    balance: {type: Number, default: 0}
});

const User = mongoose.model('Details', regSchema);

module.exports = User;