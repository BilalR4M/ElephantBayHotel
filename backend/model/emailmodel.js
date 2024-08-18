const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: String,
    phone: Number
}, {
    timestamps: true
});

const EmailMessageModel = mongoose.model("email", emailSchema);
module.exports = EmailMessageModel;
