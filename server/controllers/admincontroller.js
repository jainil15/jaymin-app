const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");

/* ADD USER */
const addUser = async (req, res) => {
  try {
      const { name, role, email, password } = req.body;
      console.log('ohhh.................................................');

      console.log(name, role, email, password);
      console.log('ohhh.................................................');

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const userDoc = await User.create({
      name,
      role,
      email,
      password,
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


// user login 
// user login 
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("_token", token, { httpOnly: true });

    // Include the user's role in the response

    console.log('Request Body:', req.body);  
    res.status(200).json({ message: "Logged in successfully", role: user.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error occurred ${error}` });
  }
};

module.exports = {
  addUser,
  getUsers,
  deleteUser,
  editUser,
  getUser,
  loginUser,
};

