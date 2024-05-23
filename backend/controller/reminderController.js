const Reminder = require("../model/reminderModel")


const getAllReminder = async (req, res) => {
    try {
        console.log("Handling getAllReminder request");
        const reminderData = await Reminder.find();

        // Transform the timestamp format for each data item
        const transformedData = reminderData.map(item => ({
            ...item.toObject(),
            timestamp: formatTimestamp(item.dateTime)
        }));

        res.json(transformedData);
    } catch (err) {
        console.error("Error in getAllReminder:", err);
        res.status(500).json({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

// Function to format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


const saveReminder = async (req, res) => {
    try { 
        console.log("Request Body:", req.body);
        const newReminder = await Reminder.create(req.body);
        res.status(201).json(newReminder);
    } catch(err) {
        res.status(500).json ({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};


module.exports = {
    getAllReminder,
    saveReminder,
}