const Client = require("../models/Client");

exports.createClient = async (name, email, password) => {
  try {
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      throw new Error("Email already exists");
    }

    const newClient = new Client({ name, email, password });

    await newClient.save();

    return newClient;
  } catch (error) {
    throw error;
  }
};

exports.getClientById = async (clientId) => {
  try {
    const client = await Client.findById(clientId);
    return client;
  } catch (error) {
    throw error;
  }
};

exports.getClientByEmail = async (email) => {
  try {
    const client = await Client.findOne({ email });
    return client;
  } catch (error) {
    throw error;
  }
};
