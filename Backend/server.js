const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv=require("dotenv");
const connectDb = require("./config/DB.JS");



//dotenv configuration
dotenv.config();

//DB connection
connectDb();

//resy object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/auth',require('./Routes/authRoutes'));
app.use('/api/v1/time', require('./Routes/TimePeriodRoutes'));


//PORT 
 const PORT = process.env.PORT || 3002;

//listen
app.listen(PORT, (err) => {
    if (err) {
      console.error("Error starting server:", err);
    } else {
      console.log(`Server Running on ${PORT}`.bgMagenta.white);
    }
  });
  
  
