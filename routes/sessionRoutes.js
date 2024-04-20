const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

router.get("/:professionalId", sessionController.getAllSessionsForProfessional);

router.post("/schedule", sessionController.scheduleSession);

router.put("/:sessionId", sessionController.updateSession);

router.delete("/:sessionId", sessionController.deleteSession);

module.exports = router;
