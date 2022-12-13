const userAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "Access denied. Please login to continue.",
    });
  }
};

module.exports = userAuth;
