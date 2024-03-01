const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session'); // Add this line
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminroutes');
const pmRoutes = require('./routes/pmroutes');

require('dotenv').config();
const PORT = process.env.PORT || 4004;

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Add the express-session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a strong secret
  resave: false,
  saveUninitialized: false,
}));

app.use("/uploads", express.static(__dirname + "/uploads"));

// Example route to check session status
app.get('/api/user', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Login route
app.post("/login", (req, res, next) => {
  // Validate user credentials (dummy logic for demonstration)
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    // Store user data in the session
    req.session.user = { username };
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.use("/admin", adminRoutes);
app.use('/projectmanager', pmRoutes);

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
  );
}).catch(error => console.error('Error connecting to MongoDB:', error));
