const Relay = require("../model/relayModel")


const getAllControlRelay = async (req, res) => {
    try {
        console.log("Handling getAllControlRelay request");
        const relay = await Relay.findOne().sort({ lastUpdated: -1 }); // Get the latest state

        if (!relay) {
            // If no relay state is found, default to 'off'
            return res.json('off');
        }

        // Return the status of the relay
        res.json(relay.status);
    } catch (err) {
        console.error("Error in getControlRelayState:", err);
        res.status(500).json({
            error: "Internal Server Error",
            details: err.message 
        });
    }
};

const saveControlRelay = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        // Ensure the request body contains isPumpOn
        if (typeof req.body.isPumpOn !== 'boolean') {
            return res.status(400).json({ error: 'Invalid request body. Expected a boolean value for isPumpOn.' });
        }

        const newRelay = await Relay.create({
            status: req.body.isPumpOn ? 'on' : 'off', // Map isPumpOn to status
            lastUpdated: new Date() // Ensure you have a timestamp if needed
        });

        res.status(201).json(newRelay);
    } catch (err) {
        console.error('Error saving control relay:', err.message);
        res.status(500).json({
            error: 'Internal Server Error',
            details: err.message
        });
    }
};

module.exports = {
    getAllControlRelay,
    saveControlRelay,
}