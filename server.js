const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
//-----Prerequisites Done

//-----Passport Start
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.model");

passport.use(
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
        },
        User.authenticate()
    )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
//-----Passport Stop

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//-----MongoDB Connect Start
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
//-----MongoDB Connect Stop

//-----Routes Start
const usersRouter = require("./routes/users");

app.use("/users", usersRouter);
//-----Routes Stop

//-----Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
