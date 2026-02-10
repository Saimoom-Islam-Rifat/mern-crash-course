import { Schema, model } from "mongoose";

const productSchema = Schema.create(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

const Product = model("Product", productSchema);

export default Product;
