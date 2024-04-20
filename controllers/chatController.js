const Chat = require("../models/Chat");

exports.getMessages = async (req, res) => {
  try {
    const { clientId, professionalId } = req.params;

    const messages = await Chat.find({
      $or: [
        { sender: clientId, receiver: professionalId },
        { sender: professionalId, receiver: clientId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    const newMessage = new Chat({
      sender,
      receiver,
      message,
      timestamp: new Date(),
    });

    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
