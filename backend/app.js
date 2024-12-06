const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
require("dotenv").config();

// Initialize Express App
const app = express();

// Port Configuration
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route for Testing
app.get("/", (req, res) => {
  res.send("Welcome to the MERN API!");
});

// Load Routes Dynamically
readdirSync("./routes").forEach((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

// 404 Handler for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Start the Server
const startServer = () => {
  // Connect to Database
  db();

  // Listen on Configured Port
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

// Run Server
startServer();
