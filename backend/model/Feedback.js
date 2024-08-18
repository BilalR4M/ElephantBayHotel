const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    howDidYouHear: {
        type: String,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    cleanliness: {
        type: String,
        required: true
    },
    food: {
        type: String,
        required: true
    },
    staff: {
        type: String,
        required: true
    },
    suggestions: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
