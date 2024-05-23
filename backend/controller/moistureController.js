const moistureLevel = require("../model/moistureModel");

const getAllMoistureLevel = async (req, res) => {
    try {
        console.log("Handling getAllMoistureLevel request");
        const moistureData = await moistureLevel.find();

        // Transform the timestamp format for each data item
        const transformedData = moistureData.map(item => {
            const philippinesOffset = 8 * 60 * 60 * 1000; // Philippines time offset from UTC is UTC+8
            const philippineTime = new Date(new Date(item.timestamp).getTime() + philippinesOffset);
            return {
                ...item.toObject(),
                timestamp: formatTimestamp(philippineTime)
            };
        });

        res.json(transformedData);
    } catch (err) {
        console.error("Error in getAllMoistureLevel:", err);
        res.status(500).json({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

// Function to format timestamp
function formatTimestamp(timestamp) {
    const year = timestamp.getFullYear();
    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
    const day = timestamp.getDate().toString().padStart(2, '0');
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    const seconds = timestamp.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const saveMoisture = async (req, res) => {
    try {
        // Get the current timestamp and adjust it to Philippine time
        const currentTime = new Date();
        const philippinesOffset = 8 * 60 * 60 * 1000; // Philippines time offset from UTC is UTC+8
        const philippinesTime = new Date(currentTime.getTime() + philippinesOffset);

        // Assign the converted timestamp to the request body
        req.body.timestamp = philippinesTime;

        // Save the moisture data with the modified timestamp
        const newMoisture = await moistureLevel.create(req.body);

        // Respond with the saved data
        res.status(201).json(newMoisture);
    } catch (err) {
        // If an error occurs, send an error response
        res.status(500).json({
            err: "Internal Server Error",
            details: err.message
        });
    }
};

module.exports = {
    getAllMoistureLevel,
    saveMoisture,
};
