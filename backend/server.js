const express = require("express");
const connectDB = require("./DB/db");
const model = require("./DB/model/url")
const path = require("path");
const app = express();

app.use(express.json({ extended: false }));

// setting up view engine

connectDB();


// define routes
app.use("/setUrl", require('./routes/url'));
app.use("/", require('./routes/routesIndex'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
})