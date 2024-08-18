const mongoose = require('mongoose');

const emailMessageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: String,
    subject: String,
    message: String
}, {
    timestamps: true
});

const EmailMessage = mongoose.model("message", emailMessageSchema);
module.exports = EmailMessage;