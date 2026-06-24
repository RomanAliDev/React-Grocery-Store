const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRouter = require("./Routes/authRouter.js");
const multer = require("multer");
const path = require("path");
const productRouter = require("./Routes/productRouter.js");
const cartRouter = require("./Routes/cartRouter.js");
const productController = require("./Controller/productController");
const addressRouter = require("./Routes/addressRouter.js");
const orderRouter = require("./Routes/orderRouter.js");

dotenv.config();

const router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.urlencoded());

const randomString = (length) => {
  const characters = "ABCDEFGHIGHKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

app.use(express.static(path.join(__dirname, "public")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});
const upload = multer({ storage });
app.post(
  "/api/product/add",
  upload.single("image"),
  productController.createProduct,
);
app.put(
  "/api/product/update/:id",
  upload.single("image"),
  productController.updateProduct,
);

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

const PORT = 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection failed:", err);
  });
