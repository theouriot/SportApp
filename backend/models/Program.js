const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name: { type: String, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'creator',required: true},
    idCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'idCategory',required: true},
    idLevel: { type: mongoose.Schema.Types.ObjectId, ref: 'idCategory',required: true},
    description: { type: String },
    likeCount: { type:Number, required: true},
    viewCount: { type:Number, required: true},
    steps: { type: [
            {
                name: String,
                stepNumber: Number,
                image: String,
                sets: Number,
                reps: Number,
                description: String,
                recommandedTime: Number
            }
        ]},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
    image: { type: String },
    timestamp: Number
});


module.exports = mongoose.model('Program', eventSchema);