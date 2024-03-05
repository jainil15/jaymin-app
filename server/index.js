// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import routes
const adminRoutes = require('./routes/adminroutes');
const pmRoutes = require('./routes/pmroutes');
const clientRoutes = require('./routes/clientroutes');

// Import models
const User = require('./models/usermodel');

// Load environment variables
dotenv.config();

// Define constants
const PORT = process.env.PORT || 4004;
const corsOptions = {
  origin: 'http://localhost:3000',
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
app.use(session({
  secret: 'c9df49d35eee83c2b2fdb67decac8be4fc2f9271679d1fa435bf32c4d89c33011344f468f7b7abc114fce83c8a7aec1d6c07d8f4a3aa0e6886bc7bd35a2f2040',
  resave: false,
  saveUninitialized: false,
}));

// Define routes
app.use("/admin", adminRoutes);
app.use('/projectmanager', pmRoutes);
app.use('/client', clientRoutes);


// Define API endpoints
app.get('/api/user', async (req, res) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    res.status(200).json({ userId: req.session.userId, name: user.name });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.userId = user._id; 
  res.status(200).json({ message: "Logged in successfully", role: user.role });
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out, please try again.' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
  );
}).catch(error => console.error('Error connecting to MongoDB:', error));
