const mongoose = require("mongoose");
require('dotenv').config();

async function connectDB() {
    try {
        console.log(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);   
        await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        console.log("MongoDB connected secsessfuly");

    } catch (error) {
        console.error("DB connection failed");        
    }
}

module.exports = connectDB;