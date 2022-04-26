const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    alias: { type: String, required: true, unique: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
});

module.exports = mongoose.model('Client', eventSchema);