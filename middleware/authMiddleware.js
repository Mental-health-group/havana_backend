const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const Professional = require("../models/Professional");
const { JWT_SECRET_KEY } = process.env;

// Middleware to authenticate client requests
exports.authenticateClient = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const client = await Client.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!client) {
      throw new Error();
    }

    req.client = client;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

// Middleware to authenticate professional requests
exports.authenticateProfessional = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const professional = await Professional.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!professional) {
      throw new Error();
    }

    req.professional = professional;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
