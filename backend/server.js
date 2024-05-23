const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
require("dotenv").config()

const routes = require('./routes/routes');

// init app % middleware
const app = express()
app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))


// db connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});

// Use your router for the specified routes
app.use('/api', routes);
// app.use(cookieParser())

//Set up server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

