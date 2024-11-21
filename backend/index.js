require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// Import Routes
const addressRoutes = require("./routes/address");
const menuRoutes = require("./routes/menu");

const validateApiKey = require("./middleware/auth");
const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// Public routes (no API key required)
app.use("/api/menu", menuRoutes);

// Protected routes (API key required)
app.use("/api/addresses", validateApiKey, addressRoutes);

// Body parser
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Database Configuration
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start the Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
