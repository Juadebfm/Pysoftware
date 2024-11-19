require("dotenv").config();

const validateApiKey = (req, res, next) => {
  const apiKey = req.header("X-API-KEY"); // Retrieve API key from headers
  const validApiKey = process.env.API_KEY; // The valid key from .env

  if (!apiKey) {
    return res.status(401).json({ error: "API key is required" });
  }

  if (apiKey !== validApiKey) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next(); // If valid, proceed to the next middleware or route handler
};

module.exports = validateApiKey;
