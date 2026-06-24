const express = require("express");
const addressController = require("../Controller/addressController.js");

const addressRouter = express.Router();

addressRouter.get("/:userId", addressController.getAddresses);
addressRouter.post("/add", addressController.saveAddress);

module.exports = addressRouter;
