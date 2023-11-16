const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from localhost:3000 and your Vercel deployment
      const allowedOrigins = [
        "http://localhost:3000",
        "https://mern-task-app-puce.vercel.app",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(taskRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("<h1> Home Page!</h1>");
});

// The provided port by the hosting platform or default to 5000
const port = process.env.PORT || 5000;

// connect database
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
