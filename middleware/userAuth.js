const userAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({ success: false, message: "Token invalid or expired. Access denied." });
  }
};

module.exports = userAuth;
