const mongoose = require('mongoose');
const User = require("../model/user");
const { startProcessing } = require('../services/requestProcessor');
require("dotenv").config();

mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in connecting to db"));

db.once("open", async () => {
    console.log("Connected to database successfully!");
    try {
        const users = await User.find({});
        users.forEach(user => {
            startProcessing(user._id).catch(console.error);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});

module.exports = db;
