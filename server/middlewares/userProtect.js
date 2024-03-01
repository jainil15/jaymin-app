const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const protectUser = async (req, res, next, role) => {
  try {
    const _token = req.cookies._token;

    if (!_token) {
      return res.status(401).json({ message: "Token does not exist" });
    }

    const verifiedUser = jwt.verify(_token, process.env.JWT_SECRET);

    const root_user = await User.findOne({
      _id: verifiedUser._id,
    });

    if (role === undefined || role === root_user.role) {
      req.user = root_user;
      redirectToDashboard(req, res, root_user.role);
    } else {
      res.status(401).json({ message: "Authorization failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Authorization failed" });
  }
};

const redirectToDashboard = (req, res, role) => {
  switch (role) {
    case "Admin":
      res.redirect("/admin/dashboard");
      break;
    case "Client":
      res.redirect("/client/dashboard");
      break;
    case "Projectmanager":
      res.redirect("/projectmanager/dashboard");
      break;
    case "Auditor":
      res.redirect("/auditor/dashboard");
      break;
    default:
      res.status(401).json({ message: "Invalid role" });
  }
};

module.exports = { protectUser };
