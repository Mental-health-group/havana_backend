const Session = require("../models/Session");

exports.getAllSessionsForProfessional = async (req, res) => {
  try {
    const { professionalId } = req.params;

    const sessions = await Session.find({
      professional: professionalId,
    }).populate("client", "name");

    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.scheduleSession = async (req, res) => {
  try {
    const { professional, client, date, duration } = req.body;

    const newSession = new Session({
      professional,
      client,
      date,
      duration,
    });

    await newSession.save();

    res.status(201).json({ message: "Session scheduled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { date, duration } = req.body;

    await Session.findByIdAndUpdate(sessionId, { date, duration });

    res.status(200).json({ message: "Session updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    await Session.findByIdAndDelete(sessionId);

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
