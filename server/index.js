const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminroutes');
const pmRoutes = require('./routes/pmroutes'); 

/* CONFIGURATIONS */
require('dotenv').config();
const PORT = process.env.PORT || 4004;

/* EXPRESS CONFIGURATIONS */
const app = express();

app.use(cors());  // Enable CORS for all routes

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/login",(req,res,next)=>{
  res.send({msg:"Hello buddy"})
});

app.use("/admin", adminRoutes);
app.use('/projectmanager', pmRoutes);

/* STARTUP */
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);

connectDB();
