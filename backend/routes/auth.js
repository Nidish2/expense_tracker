const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/authController");

// Authentication routes
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/profile", profile);

module.exports = router;
