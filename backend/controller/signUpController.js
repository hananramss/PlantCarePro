const Admin = require("../model/signUpModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getAllAdmin = async (req, res) => {
    try {
        console.log("Handling getAlladminSignup request");
        const admin = await Admin.find();
        res.json(admin);
    } catch (err) {
        console.error("Error in getAlladminSignup:", err);
        res.status(500).json({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

const registerAdmin = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const admin = await Admin.findOne({email});
        if (admin) {
            return res.json({message: "User already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            email,
            password: hashPassword,
        });

        await newAdmin.save();
        return res.json({success: true, message: "Record registered"});
    } catch (error) {
        console.error("Error during admin signup:", error);
        return res.status(500).json({message: "Internal server error"});
    }
};

// // Function to generate JWT token
// const generateToken = (payload) => {
//     return jwt.sign(payload, process.env.KEY, { expiresIn: '1hr' });
// };

// Login admin user
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "User not registered" });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.json({ message: "Password is incorrect" });
        }

        // Generate JWT token
        // const token = generateToken({ username: admin.username, email: admin.email });
        const token = jwt.sign({username: admin.username}, process.env.KEY, {expiresIn: '1hr'})

        // Set token as a cookie in the response
        res.cookie('token', token, { maxAge: 360000, httpOnly: true, sameSite: 'strict' });
        
        // Send token in response
        return res.json({ success: true, message: "Login successful" });

    } catch (error) {
        console.error("Error during admin login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// // Middleware function to check token and authenticate user
// const authenticateToken = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     jwt.verify(token, process.env.KEY, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: "Unauthorized: Invalid token" });
//         }

//         req.admin = decoded;
//         next();
//     });
// };

const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({success: true})
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllAdmin,
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    // authenticateToken,
};