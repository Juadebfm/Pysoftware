// routes/menu.js
const express = require("express");
const router = express.Router();

const menuItems = [
  { id: "1", menu_item: "Address", href: "/" },
  { id: "2", menu_item: "Student", href: "/students" },
  { id: "3", menu_item: "Login", href: "/login" },
  { id: "4", menu_item: "Tutor", href: "/tutor" },
  { id: "5", menu_item: "Pricing", href: "/price_list" },
  { id: "6", menu_item: "Sign-up", href: "/signup" },
  { id: "7", menu_item: "Contact", href: "/contact" },
  { id: "8", menu_item: "Help", href: "/help" },
  { id: "9", menu_item: "About", href: "/about" },
];

router.get("/", (req, res) => {
  res.json(menuItems);
});

module.exports = router;
