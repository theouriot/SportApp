const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name: { type: String, required: true},
    // temp author
    author: { type: Number,required: true},
    // futur author author: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach',required: true},
    description: { type: String},
    content: { type: String},
    likeCount: { type:Number, required: true},
    viewCount: { type:Number, required: true},
    image: { type:String, required: true}
});

module.exports = mongoose.model('Article', eventSchema);