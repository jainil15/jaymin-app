const User = require("../models/usermodel");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

//  add user
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
      password: hashedPassword, 
    });

    // Send welcome email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, 
      subject: 'Welcome to Customer Support Platform',
      html: `<p>Thank you for signing up on our platform!</p>
            <p>website link : http://localhost:3000</p>
            <p>Email ID: ${email}</p>
            <p>Password: ${password}</p>
            <p>Invitation Role: ${role}</p>`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return res.status(200).json(userDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: "An error occurred. Please try again." });
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
    return res.json({ message: "An error occurred. Please try again." });
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
    return res.json({ message: "An error occurred. Please try again." });
  }
};

// get user by role

const getUserByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const user = await
    User.find
    ({ role: role });
    if (user) {
      return res.status(200).json(user);
    }
  }
  catch (error) {
    console.log(error);
    return res.json({ message: "An error occurred. Please try again." });
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
    return res.json({ message: "An error occurred. Please try again." });
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
    return res.json({ message: "An error occurred. Please try again." });
  }
};

// Assign project to user
const assignProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_id } = req.body;

    const userDoc = await User.findById(id);

    if (!userDoc) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Update the projects array in the User document
    if (!userDoc.projects.includes(project_id)) {
      userDoc.projects.push(project_id);
      await userDoc.save();
    }

    return res.status(200).json(userDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

// Unassign project from user
const unassignProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_id } = req.body;

    const userDoc = await User.findById(id);

    if (!userDoc) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Update the projects array in the User document
    userDoc.projects = userDoc.projects.filter(project => project.toString() !== project_id);
    await userDoc.save();

    return res.status(200).json(userDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

module.exports = {
  addUser,
  getUsers,
  deleteUser,
  editUser,
  getUser,
  getUserByRole,
  assignProject,
  unassignProject
};
