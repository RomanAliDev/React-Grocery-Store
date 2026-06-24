const express = require("express");

const cartController = require("../Controller/CartController.js");
const CartRouter = express.Router();

CartRouter.get("/:userId", cartController.getCart);
CartRouter.post("/add", cartController.addToCart);
CartRouter.put("/update", cartController.updateQuantity);
CartRouter.post("/delete", cartController.removeItem);

module.exports = CartRouter;
