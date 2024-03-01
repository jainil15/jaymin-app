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


const corsOptions = {
  origin: 'http://localhost:3000', // frontend server
  credentials: true, // This allows the session cookie to be sent back and forth
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.post("/login",(req,res,next)=>{
  res.send({msg:"Hello buddy"})
});


app.use("/admin", adminRoutes);
app.use('/projectmanager', pmRoutes);

/* STARTUP */
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);

connectDB();
