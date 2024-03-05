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

/* USER LOGIN */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id; // set session variable

    console.log('Request Body:', req.body);  
    res.status(200).json({ message: "Logged in successfully", role: user.role, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error occurred ${error}` });
  }
};

/* USER LOGOUT */
const logoutUser = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out, please try again.' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
}

module.exports = {
  addUser,
  getUsers,
  deleteUser,
  editUser,
  getUser,
  loginUser,
  logoutUser,
};
