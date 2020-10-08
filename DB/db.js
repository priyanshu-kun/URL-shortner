const mongoose = require("mongoose");
const config = require("config");

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false});
        console.log("Server is connected to the database!");
    }
    catch(e) {
        console.error(e.message);

        // stop program execution forcefully
        process.exit(1);
    }
}

module.exports = connectDB;
