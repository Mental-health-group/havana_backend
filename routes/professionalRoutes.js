const express = require("express");
const router = express.Router();
const professionalController = require("../controllers/professionalController");
const { authenticateProfessional } = require("../middleware/authMiddleware");

router.get(
  "/:professionalId",
  authenticateProfessional,
  professionalController.getProfessionalProfile
);
router.put(
  "/:professionalId",
  authenticateProfessional,
  professionalController.updateProfessionalProfile
);

module.exports = router;
