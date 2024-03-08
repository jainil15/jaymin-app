const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

/* ADD USER */
const addUser = async (req, res) => {
  try {
    const { name, role, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const userDoc = await User.create({
      name,
      role,
      email,
      password: hashedPassword,  // Save the hashed password
    });

    return res.status(200).json(userDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

/* GET ALL USERS */
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      return res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

/* GET A USER */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

/* EDIT USER */
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, email, password } = req.body;

    const userDoc = await User.findById(id);

    if (!userDoc) {
      return res.status(404).json({ message: "User does not exist" });
    }

    userDoc.set({
      name,
      role,
      email,
      password,
    });

    await userDoc.save();
    return res.status(200).json(userDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

/* DELETE USER */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDoc = await User.findById(id);

    if (!userDoc) {
      return res.status(404).json({ message: "User does not exist" });
    }

    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};


module.exports = {
  addUser,
  getUsers,
  deleteUser,
  editUser,
  getUser
};
