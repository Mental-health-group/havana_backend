const Chat = require("../models/Chat");

exports.getMessages = async (clientId, professionalId) => {
  try {
    const messages = await Chat.find({
      $or: [
        { sender: clientId, receiver: professionalId },
        { sender: professionalId, receiver: clientId },
      ],
    }).sort({ timestamp: 1 });

    return messages;
  } catch (error) {
    throw error;
  }
};

exports.sendMessage = async (sender, receiver, message) => {
  try {
    const newMessage = new Chat({
      sender,
      receiver,
      message,
      timestamp: new Date(),
    });

    await newMessage.save();

    return newMessage;
  } catch (error) {
    throw error;
  }
};
