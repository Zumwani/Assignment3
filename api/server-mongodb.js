const mongoose = require("mongoose");

const initMongoDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB is running: " + connection.connection.host);
}

module.exports = initMongoDB;