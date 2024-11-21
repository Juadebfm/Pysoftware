const express = require("express");
const { ZodError } = require("zod");
const Address = require("../models/Address");
const { validateAddress } = require("../validation/addressValidation");

const router = express.Router();

// Centralized error handling middleware
const handleError = (res, error) => {
  console.error("Error:", error);

  // Zod validation errors
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      error: true,
      message: "Validation Error",
      details: formattedErrors,
    });
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern)[0];
    const duplicateValue = error.keyValue[duplicateField];

    return res.status(409).json({
      error: true,
      message: `Duplicate ${duplicateField} detected`,
      field: duplicateField,
      value: duplicateValue,
    });
  }

  // Mongoose validation errors
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((err) => ({
      path: err.path,
      message: err.message,
    }));

    return res.status(400).json({
      error: true,
      message: "Validation Error",
      details: errors,
    });
  }

  // Generic error response
  res.status(500).json({
    error: true,
    message: error.message || "An unexpected error occurred",
  });
};

// Middleware to validate request body
const validateRequestBody = (req, res, next) => {
  try {
    // Validate the entire request body
    validateAddress(req.body);
    next();
  } catch (error) {
    handleError(res, error);
  }
};

// Create a new address
router.post("/", validateRequestBody, async (req, res) => {
  try {
    // Check for duplicate geographical location
    const { lat, lon } = req.body;
    if (lat && lon) {
      const existingAddress = await Address.findOne({ lat, lon });
      if (existingAddress) {
        return res.status(409).json({
          error: true,
          message: "Address with these geographical coordinates already exists",
        });
      }
    }

    // Create and save new address
    const address = new Address(req.body);
    await address.save();

    res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: address,
    });
  } catch (error) {
    handleError(res, error);
  }
});

// Get all addresses with filtering
router.get("/", async (req, res) => {
  try {
    const { search = "" } = req.query;

    // Define a query based on the search parameter
    const query = search
      ? {
          $or: [
            { first_name: { $regex: search, $options: "i" } },
            { last_name: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { street: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Fetch all matching addresses
    const addresses = await Address.find(query);

    res.json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    handleError(res, error);
  }
});

// Get address by ID
router.get("/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({
        error: true,
        message: "Address not found",
      });
    }
    res.json({ success: true, data: address });
  } catch (error) {
    handleError(res, error);
  }
});

// Update address
router.put("/:id", validateRequestBody, async (req, res) => {
  try {
    // Remove _id from update to prevent ID modification
    const updateData = { ...req.body };
    delete updateData._id;

    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        error: true,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    handleError(res, error);
  }
});

// Delete address
router.delete("/:id", async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);

    if (!deletedAddress) {
      return res.status(404).json({
        error: true,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
});

// Get customer by phone
router.get("/phone/:phone", async (req, res) => {
  try {
    // Sanitize phone number (remove non-digit characters)
    const sanitizedPhone = req.params.phone.replace(/[^\d]/g, "");

    const customer = await Address.findOne({ phone: sanitizedPhone });
    if (!customer) {
      return res.status(404).json({
        error: true,
        message: "Customer not found",
      });
    }

    // Selective fields response
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

    res.json({ success: true, data: response });
  } catch (error) {
    handleError(res, error);
  }
});

// Get customer by customer number
router.get("/customer_number/:customer_number", async (req, res) => {
  try {
    const customer = await Address.findOne({
      customer_number: req.params.customer_number,
    });

    if (!customer) {
      return res.status(404).json({
        error: true,
        message: "Customer not found",
      });
    }

    res.json({ success: true, data: customer });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
