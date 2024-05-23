const mongoose = require('mongoose');

// Define Relay Schema
const relaySchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['on', 'off'],
        default: 'off'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const Relay = mongoose.model("Relay", relaySchema, "control_relay");

module.exports = Relay;

