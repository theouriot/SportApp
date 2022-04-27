const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'creator',required: true},
    description: { type: String },
    likeCount: { type:Number, required: true},
    viewCount: { type:Number, required: true},
    steps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'steps'}],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
});

module.exports = mongoose.model('Program', eventSchema);