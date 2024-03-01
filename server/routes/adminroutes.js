
// adminroutes.js
const express = require("express");
const router = express.Router();
const { protectUser } = require("../middlewares/userProtect");

const {
  addUser,
  getUsers,
  getUser,
  editUser,
  loginUser, // Import loginUser function
} = require("../controllers/admincontroller");

/* ROUTES */
router.post("/adduser", addUser);
router.get("/getusers", getUsers);

// Apply protectUser middleware to the login route
router.post("/login", protectUser, loginUser);


module.exports = router;
