
// adminroutes.js
const express = require("express");
const router = express.Router();
const { protectUser } = require("../middlewares/userProtect");

const {
  addUser,
  getUsers,
  getUser,
  editUser,
  loginUser,
  logoutUser
} = require("../controllers/admincontroller");

/* ROUTES */
router.post("/adduser",protectUser, addUser);
router.get("/getusers",protectUser, getUsers);

router.post("/login", protectUser, loginUser);


module.exports = router;
