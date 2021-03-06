//jshint esversion:6
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./src/router/userRoutes');
const adminRouter = require('./src/router/adminRoutes');





const app = express();


//db config
const db = require('./src/database/key').MongoURI;


//connect to mongoose
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("mongo connected"))
    .catch(err => console.log(err));




//body parser
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.status(200).json({ message: "Welcome to mylawlegal.com." });
});

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);




const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log("server started on" + " " + PORT));

