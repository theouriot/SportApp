const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'author',required: true},
    content: { type: String, required: true },
    articleRef: { type: mongoose.Schema.Types.ObjectId, ref: 'steps'},
});

module.exports = mongoose.model('Comment', eventSchema);