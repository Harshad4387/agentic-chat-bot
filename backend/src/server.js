require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json({limit : "10mb"}));
const connect = require("../db/db.js");
connect();
const cookie = require("cookie-parser");
app.use(cookie());

const cors = require('cors');


app.use(cors({
  origin: true,         // allows dynamic origin (all)
  credentials: true     // allows cookies & auth headers
}));

const authroute = require("../routes/auth.route.js");
app.use("/api/auth",authroute);

const chatroute = require("../routes/chat.route.js");
app.use("/api/chat",chatroute);

  
const port  = process.env.PORT || 3001


app.listen(process.env.PORT ,()=>{
    console.log("server is running on port 3000");
})