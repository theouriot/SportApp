const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    alias: { type: String, required: true, unique: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'followers'}],
    programs: [{type: mongoose.Schema.Types.ObjectId, ref: 'programs'}],
    articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'articles'}],
    profilPicture: { type: String}
});

module.exports = mongoose.model('Coach', eventSchema);