const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    idUser: { type: Int, required: true, unique: true},
    login: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    password: { type: String, required: true },

});

module.exports = mongoose.model('User', eventSchema);