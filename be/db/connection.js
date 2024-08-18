const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const connect = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL);;
        console.log(`Connected to the database : Host : ${connection.connections[0].host}, Port : ${connection.connections[0].port}`);
    } catch (error) {
        console.log('Error while connecting to the database', error);
    }
};

module.exports = connect;