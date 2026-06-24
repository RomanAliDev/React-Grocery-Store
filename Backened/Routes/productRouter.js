const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const productController = require("../Controller/productController.js");

const productRouter = express.Router();

productRouter.get("/", productController.getProduct);

// Admin only routes
productRouter.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  productController.createProduct,
);

productRouter.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct,
);

productRouter.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct,
);
module.exports = productRouter;
