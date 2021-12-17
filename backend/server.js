const express = require("express");
const connectDB = require("./DB/db");
const model = require("./DB/model/url")
const path = require("path");
const app = express();
const cors = require("cors");

app.use(express.json({ extended: false }));

// setting up view engine

connectDB();


app.use(cors({
    origin: ["https://cocky-varahamihira-ca2871.netlify.app","http://localhost:3000"], 
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// define routes
app.use("/setUrl", require('./routes/url'));
app.use("/", require('./routes/routesIndex'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
})
