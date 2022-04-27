const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    programRef: { type: mongoose.Schema.Types.ObjectId, ref: 'programRef',required: true},
    name: { type: String, required: true},
    stepNumber: { type: Number, required: true},
    image: { type: String, required: true},
    sets: { type: Number, required: true},
    reps: { type: Number, required: true},
    description: { type: String, required: true },
    recommandedTime: { type: Number, required: true}
});

module.exports = mongoose.model('Step', eventSchema);