// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { auth } = require('express-openid-connect');

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

// Auth0 configuration
// app.use(
//   auth({
//     authRequired: false,
//     auth0Logout: true,
//     issuerBaseURL: 'https://abc-name.auth0.com', // Replace with your Auth0 Domain
//     baseURL: 'http://localhost:4000', // Replace with your server base URL
//     clientID: 'demoidok', // Replace with your Client ID
//     secret: 'demoscrecttkey', // Replace with your Client Secret
//   })
// );

// Define routes
app.use("/admin", adminRoutes);
app.use('/projectmanager', pmRoutes);
app.use('/client', clientRoutes);

// Define API endpoints
app.get('/api/user', async (req, res) => {
  const user = await User.findById(req.oidc.user.sub);
  res.status(200).json({ userId: req.oidc.user.sub, name: user.name });
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Logged in successfully", role: user.role });
});

app.post('/logout', (req, res) => {
  req.oidc.logout();
});

// Define API endpoints
app.get('/api/userRole', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Add this line for logging
      console.log('User role:', user.role); 
      
      res.json({ role: user.role });
    } else {
      console.log('User not found, defaulting to Client role.'); 
      res.json({ role: 'Client' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
  );
}).catch(error => console.error('Error connecting to MongoDB:', error));
