const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name: { type: String, required: true},
});

module.exports = mongoose.model('Level', eventSchema);