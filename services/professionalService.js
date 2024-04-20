const Professional = require("../models/Professional");

exports.createProfessional = async (name, email, password) => {
  try {
    const existingProfessional = await Professional.findOne({ email });
    if (existingProfessional) {
      throw new Error("Email already exists");
    }

    const newProfessional = new Professional({ name, email, password });

    await newProfessional.save();

    return newProfessional;
  } catch (error) {
    throw error;
  }
};

exports.getProfessionalById = async (professionalId) => {
  try {
    const professional = await Professional.findById(professionalId);
    return professional;
  } catch (error) {
    throw error;
  }
};

exports.getProfessionalByEmail = async (email) => {
  try {
    const professional = await Professional.findOne({ email });
    return professional;
  } catch (error) {
    throw error;
  }
};
