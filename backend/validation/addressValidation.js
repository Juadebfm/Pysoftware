const z = require("zod");

// Comprehensive address validation schema
const addressSchema = z.object({
  // Optional fields
  _id: z.string().optional(),
  // Modify customer_number to allow number input and convert to string
  customer_number: z
    .union([z.string(), z.number().transform(String)])
    .optional(),

  // Required fields with validations
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name cannot exceed 50 characters" }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name cannot exceed 50 characters" }),

  // Phone number validation (customize regex as needed)
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, { message: "Phone number must be 10-11 digits" })
    .optional(),

  // Address fields
  street: z
    .string()
    .min(3, { message: "Street must be at least 3 characters" })
    .max(100, { message: "Street cannot exceed 100 characters" }),

  // Modify postcode to be more flexible
  postcode: z
    .string()
    .min(2, { message: "Postcode must be at least 2 characters" })
    .max(20, { message: "Postcode cannot exceed 20 characters" }),

  state: z
    .string()
    .max(50, { message: "State cannot exceed 50 characters" })
    .optional(),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" })
    .max(50, { message: "Country cannot exceed 50 characters" }),

  // Geographical coordinates (optional but validated if provided)
  lat: z.number().min(-90).max(90).optional(),
  lon: z.number().min(-180).max(180).optional(),
});

module.exports = {
  validateAddress: (data) => {
    return addressSchema.parse(data);
  },
  addressSchema,
};
