require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const validateApiKey = require("./middleware/auth");
const app = express();

// Apply globally
app.use(validateApiKey);

// Import Routes
const addressRoutes = require("./routes/address");
const menuRoutes = require("./routes/menu");

app.use("/api", menuRoutes);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Configuration
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api/addresses", addressRoutes);

// Start the Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
