const Client = require("../models/Client");

// Get client profile
exports.getClientProfile = async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update client profile
exports.updateClientProfile = async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    // Update client profile data
    client.name = req.body.name || client.name;
    // Update other fields as needed
    await client.save();
    res
      .status(200)
      .json({ message: "Client profile updated successfully", client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
