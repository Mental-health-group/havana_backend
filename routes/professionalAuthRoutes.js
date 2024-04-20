const express = require("express");
const router = express.Router();
const professionalAuthController = require("../controllers/professionalAuthController");

router.post("/register", professionalAuthController.professionalRegister);

router.post("/login", professionalAuthController.professionalLogin);

module.exports = router;
