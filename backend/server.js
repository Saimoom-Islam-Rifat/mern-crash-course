import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const newProduct = await Product.create(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in saving product", error);
    res.status(500).json({ success: false, message: "Internal server error " });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product is deleted." });
  } catch (error) {
    console.error("Error in deleting product.", error);
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

app.listen(5000, () => {
  console.log("Server connection succeded at port 5000.");
});
