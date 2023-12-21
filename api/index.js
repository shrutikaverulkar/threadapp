const express = require("express");
require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connection.once("open", () => {
    console.log("Mongo DB Connected");
    app.listen(3000, () => console.log("Server is running on port 3000"));
});

const User = require("./models/user");
const Post = require("./models/post");

// Endpoint to register user in the backend
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email Already Registered" });
        }
        // Create new user
        const newUser = new User({ name, email, password });
        // Generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        // Save the user to the database
        await newUser.save();
        // Send the verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(200).json({ message: "Registration Success" });
    } catch (error) {
        console.error("Error registering user", error);
        res.status(500).json({ message: "Error registering user" });
    }
});

const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shrutikaverulkar91@gmail.com",
            password: "ndgm rftv vime cnbx"
        }
    })
    // compose the emsil message
    const mailOptions = {
        from: "thread.com",
        to: email,
        subject: "Email verification",
        text: `please click the following link verify email http://localhost:3000/verify/${verificationToken}`
    }
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("error sending email", error);
    }
}

app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid token" });
        }
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Error getting token", error);
        res.status(500).json({ message: "Email verification failed" });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex")
    return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Invalid Email" });
        }

        if (user.password !== password) {
            return res.status(404).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Login failed", error);
        res.status(500).json({ message: "Login failed" });
    }
});
