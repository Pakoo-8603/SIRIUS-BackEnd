const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const config = require("./config");

// Import routes
const auth = require("./models/auth/routes");

// Import error handling middleware
const error = require("./network/errors");

// Create express app
const app = express();

// Use middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/api/auth", auth);

// Use error handling middleware
app.use(error);

// Set port
app.set("port", config.app.port);

// Export app
module.exports = app;