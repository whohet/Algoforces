const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user.model");

router.post("/register", (req, res) => {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
  });

  User.register(user, req.body.password, (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
    return res.status(200).json({ success: true, message: "Your account has been saved" });
  });
});

router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: err });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "(Username or Email) or Password is Incorrect",
      });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }
      return res.status(200).json({
        success: true,
        message: "Authentication successful!",
      });
    });
  })(req, res);
});

router.get("/isLoggedIn", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      success: true,
      message: "Already Authenticated!",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Please login!",
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.status(200).json({
    success: true,
    message: "Logged out!",
  });
});

module.exports = router;
