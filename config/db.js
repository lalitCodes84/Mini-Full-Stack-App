const mongoose = require('mongoose');
const env = require("dotenv").config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);

        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error({message: `Error occured : ${error}`});       
    }
};

module.exports = connectDB;
