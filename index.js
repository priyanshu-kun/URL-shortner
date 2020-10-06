const express = require("express");
const connectDB = require("./DB/db");
const path = require("path");
const app = express();

const publicPath = path.join(__dirname+"/public")

app.use(express.json({ extended: false }));

connectDB();


app.use(express.static(publicPath))


// define routes
app.use("/",require('./routes/routesIndex'));
app.use("/api/url",require('./routes/url'));

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log("Server is running on port: "+PORT);
})