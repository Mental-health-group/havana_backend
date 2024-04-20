const Session = require("../models/Session");

exports.createSession = async (professional, client, date, duration) => {
  try {
    const newSession = new Session({ professional, client, date, duration });

    await newSession.save();

    return newSession;
  } catch (error) {
    throw error;
  }
};

exports.getSessionsForProfessional = async (professionalId) => {
  try {
    const sessions = await Session.find({
      professional: professionalId,
    }).populate("client", "name");

    return sessions;
  } catch (error) {
    throw error;
  }
};

exports.updateSession = async (sessionId, date, duration) => {
  try {
    await Session.findByIdAndUpdate(sessionId, { date, duration });
  } catch (error) {
    throw error;
  }
};

exports.deleteSession = async (sessionId) => {
  try {
    await Session.findByIdAndDelete(sessionId);
  } catch (error) {
    throw error;
  }
};
