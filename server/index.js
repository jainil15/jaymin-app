// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { auth } = require("express-openid-connect");
const session = require("express-session");

// Import routes
const adminRoutes = require("./routes/adminroutes");
const pmRoutes = require("./routes/pmroutes");
const clientRoutes = require("./routes/clientroutes");
const auditorRoutes = require("./routes/auditorroutes");

// Import models
const User = require("./models/usermodel");

// Load environment variables
dotenv.config();

// Define constants
const PORT = process.env.PORT || 4004;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Initialize express app
const app = express();

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Define routes
app.use("/admin", adminRoutes);
app.use("/projectmanager", pmRoutes);
app.use("/client", clientRoutes);
app.use("/auditor", auditorRoutes);

// Define API endpoints
app.get("/api/user", async (req, res) => {
  const user = await User.findById(req.oidc.user.sub);
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    res.status(200).json({ userId: req.session.userId, name: user.name });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Define API endpoints
app.get("/api/userRole", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (user) {
      console.log("User role:", user.role);
      res.json({ role: user.role });
    } else {
      console.log("User not found, defaulting to Client role.");
      res.json({ role: "Client" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// New endpoint to get user role from session
app.get("/get-session-role", (req, res) => {
  if (req.session.role) {
    res.send({ role: req.session.role });
  } else {
    res.status(401).send("Not logged in");
  }
});
// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Auth0 configuration backend side
// app.use(
//   auth({
//     authRequired: false,
//     auth0Logout: true,
//     issuerBaseURL: 'jaysite.us.auth0.com', // Replace with your Auth0 Domain
//     baseURL: 'http://localhost:4000', // Replace with your server base URL
//     clientID: 'AVLmhHYAlnrpwCaYWfvOc3anmbT66hF2', // Replace with your Client ID
//     secret: '7n7jhX6W5--Sb-HsD_KECb4hpr6jxLTLv9_XZTQkkmG8E10gVU2WnYZAL2bsX3LO', // Replace with your Client Secret
//   })
// );
/*
  // old api without auth0

app.post("/login", async (req, res) => {
  try {
    console.log("xniowao");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.userId = user._id;
    req.session.role = user.role;
    res
    .status(200)
    .json({ message: "Logged in successfully", role: user.role, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error occurred ${error}` });
  }
});

app.post("/logout", (req, res) => {
  req.oidc.logout();
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Could not log out, please try again." });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
});
*/
