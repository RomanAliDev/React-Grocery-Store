const express = require("express");

const orderController = require("../Controller/OrderController.js");
const orderRouter = express.Router();

orderRouter.post("/place", orderController.placeOrder);

module.exports = orderRouter;
