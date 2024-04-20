const Professional = require("../models/Professional");

// Get professional profile
exports.getProfessionalProfile = async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.professionalId);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }
    res.status(200).json(professional);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update professional profile
exports.updateProfessionalProfile = async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.professionalId);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }
    // Update professional profile data
    professional.name = req.body.name || professional.name;
    // Update other fields as needed
    await professional.save();
    res
      .status(200)
      .json({
        message: "Professional profile updated successfully",
        professional,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
