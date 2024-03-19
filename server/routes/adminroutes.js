// adminroutes.js
const express = require("express");
const router = express.Router();
const { protectUser } = require("../middlewares/userProtect.js");

const {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  getUserByRole,
  assignProject,
  unassignProject,
} = require("../controllers/admincontroller.js");

/* ROUTES */
router.post("/adduser", protectUser, addUser);
router.get("/getusers", protectUser, getUsers);
router.get("/getuser/:id", protectUser, getUser);
router.put("/edituser",editUser);
router.delete("/deleteuser/:id", deleteUser);
router.get("/getuserbyrole/:role", getUserByRole);



module.exports = router;
