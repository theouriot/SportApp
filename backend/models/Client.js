const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    alias: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    profilePicture: { type: String },
    follows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'follows'}],
});

module.exports = mongoose.model('Client', eventSchema);