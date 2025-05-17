
import { Schema, model, models } from "mongoose";
const productSchema = new Schema({
    img: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  }, { timestamps: true });

export const Product = models.Product || model("Product", productSchema);

