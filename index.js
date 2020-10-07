const express = require("express");
const connectDB = require("./DB/db");
const model = require("./DB/model/url")
const path = require("path");
const hbs = require("ejs");
const app = express();
const publicPath = path.join(__dirname+"/public")

app.use(express.json({ extended: false }));

// setting up view engine
// app.engine("hbs",hbs({ extname: 'hbs', layoutsDir: path.join(__dirname+"/views")}));
app.set("view engine","ejs")

connectDB();

app.use(express.static(publicPath))


app.get("/", (req,res) => {
    res.render("main")
})


// define routes
app.use("/",require('./routes/routesIndex'));
app.use("/",require('./routes/url'));

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log("Server is running on port: "+PORT);
})