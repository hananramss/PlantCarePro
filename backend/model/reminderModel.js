const mongoose = require('mongoose');

// Define the schema for the reminder
const reminderSchema = new mongoose.Schema({
    activity: {
        type: String,
        required: true,
        enum: ['Watering', 'Fertilizing', 'Repotting', 'Other'] // Add other activities if needed
    },
    plant: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    notificationMethod: {
        type: String,
        required: true,
        enum: ['Email', 'SMS', 'In-App Notification'] // Add other methods if needed
    },
    additionalNotes: {
        type: String
    }
});

// Create the model from the schema
const Reminder = mongoose.model('Reminder', reminderSchema, 'reminder_form');

// Export the model
module.exports = Reminder;
