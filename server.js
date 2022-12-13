// --------------- Prerequisites ---------------
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { CLIENT_URL } = require("./config/config");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5555;

app.use(
  cors({
    origin: CLIENT_URL, // Allow to server to accept request from different origin.
    methods: "*",
    credentials: true, // Allow session cookie from browser to pass through.
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --------------- Passport Config ---------------
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.model");
const env = process.env.NODE_ENV || "development";

// ----- Configure auth session options -----
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30, // Cookie expiry time = 1 month (in milliseconds)
  },
};
if (env == "production") {
  app.set("trust proxy", 1); // trust first proxy
  sessionOptions.cookie.sameSite = "none";
  sessionOptions.cookie.secure = true;
  sessionOptions.cookie.httpOnly = false;
}
app.use(session(sessionOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});
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
app.use(express.static("./"));

passport.serializeUser((user, done) => {
  const sessionUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    userType: user.userType,
  };
  done(null, sessionUser);
});
passport.deserializeUser((sessionUser, done) => {
  done(null, sessionUser);
});

// --------------- Routes ---------------
const userRouter = require("./routes/userRouter");
app.use("/users", userRouter);
const problemCreationRouter = require("./routes/problemCreationRouter");
app.use("/problemCreation", problemCreationRouter);
const problemRouter = require("./routes/problemRouter");
app.use("/problem", problemRouter);

// --------------- Connect to MongoDB ---------------
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => console.error(err));

// --------------- Listen to given PORT ---------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
