const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const cookieParser = require("cookie-parser");

const protectUser = async (req, res, next, expectedRole) => {
  try {
    const token = req.cookies._token;

    if (!token) {
      return res.status(401).json({ message: "Token does not exist" });
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedUser._id);

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    if (!expectedRole || user.role.toLowerCase() === expectedRole.toLowerCase()) {
      req.user = user;
      redirectToDashboard(res, user.role);
    } else {
      res.status(401).json({ message: "Authorization failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authorization failed" });
  }
};

const redirectToDashboard = (res, role) => {
  switch (role.toLowerCase()) {
    case "admin":
      res.redirect("/admin/dashboard");
      break;
    case "client":
      res.redirect("/client/dashboard");
      break;
    case "projectmanager":
      res.redirect("/projectmanager/dashboard");
      break;
    case "auditor":
      res.redirect("/auditor/dashboard");
      break;
    default:
      res.status(401).json({ message: "Invalid role" });
  }
};

module.exports = { protectUser };
