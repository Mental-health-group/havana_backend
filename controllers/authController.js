const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Client = require("../models/Client");
const Professional = require("../models/Professional");
const clientConfig = require("../config/clientConfig");
const professionalConfig = require("../config/professionalConfig");

exports.login = async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.login(user, { session: false }, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

      return res.status(200).json({ token });
    });
  })(req, res, next);
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await Client.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new Client({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
