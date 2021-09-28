const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {CLIENT_URL} = require('./config/config');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
//-----Prerequisites Done

app.use(
  cors({
    origin: CLIENT_URL, // allow to server to accept request from different origin
    methods: "*",
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ----- Passport Start -----
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.model");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // cookie expiry time = 1 month (in milliseconds)
    },
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    User.authenticate()
  )
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ----- Passport End -----

// ----- MongoDB Connect Start -----
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => console.log(err));
// ----- MongoDB Connect End -----

// ----- Routes Start -----
const userRouter = require("./routes/userRouter");
app.use("/users", userRouter);
// ----- Routes End -----

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
