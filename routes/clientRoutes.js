const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const { authenticateClient } = require("../middleware/authMiddleware");

router.get("/:clientId", authenticateClient, clientController.getClientProfile);
router.put(
  "/:clientId",
  authenticateClient,
  clientController.updateClientProfile
);

module.exports = router;
