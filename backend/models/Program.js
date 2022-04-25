const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach',required: true},
    likeCount: { type:Number, required: true},
    steps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Step'}]
});

module.exports = mongoose.model('Event', eventSchema);