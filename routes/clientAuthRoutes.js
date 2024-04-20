const express = require("express");
const router = express.Router();
const clientAuthController = require("../controllers/clientAuthController");

router.post("/register", clientAuthController.clientRegister);

router.post("/login", clientAuthController.clientLogin);

module.exports = router;
