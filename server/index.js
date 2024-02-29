const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { auth } = require('express-openid-connect');

/* CONFIGURATIONS */
require('dotenv').config();
const PORT = process.env.PORT || 4004;

/* EXPRESS CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));

/* AUTH0 CONFIGURATIONS */
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'hvU8TgiP0DzxpnlglvwzKj8bgu5Z7A9l',
  issuerBaseURL: 'https://dev-hd6ipxvrhs35fzbt.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

/* STARTUP */
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);

// Call the connectDB function
connectDB();

/* APIs */
// Add your route handlers and API endpoints here
