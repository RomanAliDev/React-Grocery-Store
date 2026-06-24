const Address = require("../Model/Address.js");

exports.saveAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).json({ message: "Address saved successfully", address });
  } catch {
    res.status(500).json({ message: "Error saving address", error });
  }
};
//Get Addresses by User ID
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      userId: req.params.userId,
    });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses", error });
  }
};
