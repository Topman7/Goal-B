const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Ensure the goalRoutes file exists in ./routes/goalRoutes.js
const goalRoutes = require("./routes/goalRotes");

// Intialize the express application
const app = express();

// define the port
const port = process.env.PORT || 4000;

// middleware
//  cors
app.use(express.json());

//  routes middleware
app.use("/api/goals", goalRoutes);

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database Connected");

    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
// Remove sensitive credentials from source files and use environment variables instead.
// Ensure you have a .env file with the following content:
// MONGO_URI=mongodb+srv://topeadedapo:vIrSXj7WiPEENse6@cluster0.kikqc5g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://topeadedapo:vIrSXj7WiPEENse6@cluster0.kikqc5g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
