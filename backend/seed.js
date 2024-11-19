require("dotenv").config();
const mongoose = require("mongoose");
const Address = require("./models/Address");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Sample Data
const initialAddresses = [
  {
    first_name: "John",
    last_name: "Doe",
    street: "123 Elm Street",
    postcode: "E1 6AN",
    state: "London",
    country: "United Kingdom",
    lat: 51.509865,
    lon: -0.118092,
    phone: "07063116133",
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    street: "456 Oak Lane",
    postcode: "SW1A 2AA",
    state: "London",
    country: "United Kingdom",
    lat: 51.503363,
    lon: -0.127625,
    phone: "08012345678",
  },
  // Add other address objects as needed
];

// Add customer_number to each address
initialAddresses.forEach((address, index) => {
  address.customer_number = index + 1; // Assign a unique number starting from 1
});

// Seed Function
const seedDatabase = async () => {
  try {
    await Address.deleteMany(); // Clears existing data
    await Address.insertMany(initialAddresses); // Adds initial data with customer_number
    console.log("Database seeded with updated addresses!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

// Run Seed Function
seedDatabase();
