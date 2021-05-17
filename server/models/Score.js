const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
});

module.exports = Score = mongoose.model('score', ScoreSchema)