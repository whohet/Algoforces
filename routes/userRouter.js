const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { CLIENT_URL, SERVER_URL } = require("../config/config");

const { readFileSync } = require("fs");
const handlebars = require("handlebars");
const sendMail = require("../utils/sendMail");

const sourceHtml = readFileSync("./utils/emailTemplates/confirmEmail.html", "utf-8").toString();
const verifyEmailTemplate = handlebars.compile(sourceHtml);

router.post("/register", async (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ success: false, message: "Please enter your username" });
  }
  if (!req.body.email) {
    return res.status(400).json({ success: false, message: "Please enter your email address" });
  }
  if (req.body.password < 8) {
    return res.status(400).json({ success: false, message: "Password must be atleast 8 character long" });
  }
  if (req.body.password != req.body.confirmPassword) {
    return res.status(400).json({ success: false, message: "Password and confirm password must be same" });
  }
  // If user already exists but has not confirmed email address then remove from database.
  await User.deleteOne({ email: req.body.email, isConfirmed: false });

  const user = new User({
    email: req.body.email,
    username: req.body.username,
  });

  User.register(user, req.body.password, async (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    // Generate a token which expires in 1hour. we will send a email verification URL with this token to registered user.
    const token = jwt.sign({ email: req.body.email, type: "verify" }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const url = `${SERVER_URL}/users/verify/${token}`;
    const replacements = {
      username: req.body.username,
      verifyUrl: url,
    };
    const htmlToSend = verifyEmailTemplate(replacements);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Please confirm your email address",
      attachments: [
        {
          filename: "logo192.png",
          path: __dirname + "/../utils/emailTemplates/logo192.png",
          cid: "logo",
        },
      ],
      html: htmlToSend,
    };
    const info = await sendMail(mailOptions);
    if (!info.success) {
      return res
        .status(500)
        .json({ success: false, message: " Internal server error. Can't send confirmation mail. Please try again." });
    }
    return res.status(200).json({ success: true, message: "Your account has been created successfully." });
  });
});

router.get("/verify/:token", async (req, res) => {
  let tokenData = {};
  // First verify then token. if token is invalid then send the proper response.
  try {
    const token = req.params.token;
    tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Your token is expired. Please register again.",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Your token is invalid. Please register again.",
      });
    }
  }
  // Now that token is valid. Update the "isComfirmed" parameter in database.
  try {
    await User.findOneAndUpdate({ email: tokenData.email }, { $set: { isConfirmed: true } });
    return res.redirect(`${CLIENT_URL}/login?emailConfirm=true`);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ success: false, message: "Please enter your username or email." });
  }
  if (!req.body.password) {
    return res.status(400).json({ success: false, message: "Plese enter your password." });
  }

  try {
    const user = await User.findOne({ $or: [{ email: req.body.username }, { username: req.body.username }] });
    if (user && !user.isConfirmed) {
      return res.status(401).json({ success: false, message: "Please confirm your email address." });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server error. Please try again." });
  }

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
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          userType: user.userType,
          avatarUrl: user.avatarUrl,
        },
      });
    });
  })(req, res);
});

router.get("/isLoggedIn", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      success: true,
      user: req.session.passport.user,
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
  res.status(200).clearCookie("connect.sid");
  req.session.destroy(function (err) {
    return res.json({
      success: true,
      message: "Logged out!",
    });
  });
});

module.exports = router;
