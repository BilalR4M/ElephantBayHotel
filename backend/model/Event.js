const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    ename: {
        type: String,
        required: true
    },
    edate: {
        type: String,
        required: true
    },
    stime: {
        type: String,
        required: true
    },
    etime: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean
    },
    descrip: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    hallType: {
        type: String,
        required: true
    }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
