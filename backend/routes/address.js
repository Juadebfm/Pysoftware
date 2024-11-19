const express = require("express");
const Address = require("../models/Address");

const router = express.Router();

// Create a new address
router.post("/", async (req, res) => {
  try {
    // Destructure the request body to extract address details
    const { street, postcode, country, lat, lon } = req.body;

    // Check if an address with the same details already exists
    const existingAddress = await Address.findOne({
      lat,
      lon,
    });

    if (existingAddress) {
      return res
        .status(400)
        .json({ error: "Address with these details already exists" });
    }

    // If no duplicate found, create and save the new address
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all addresses
router.get("/", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get address by ID
router.get("/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Address
router.delete("/:id", async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Customer By Phone
router.get("/phone/:phone", async (req, res) => {
  try {
    const customer = await Address.findOne({ phone: String(req.params.phone) });
    if (customer) {
      const response = {
        id: customer._id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        street: customer.street,
        postcode: customer.postcode,
        state: customer.state,
        country: customer.country,
        lat: customer.lat,
        lon: customer.lon,
      };
      res.json(response);
    } else {
      res
        .status(404)
        .json({ error: "Customer not found for this phone number" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get customer by customer_number
router.get("/customer_number/:customer_number", async (req, res) => {
  try {
    const customer = await Address.findOne({
      customer_number: req.params.customer_number,
    });
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: "Customer not found for this number" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
