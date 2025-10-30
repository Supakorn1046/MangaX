import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
  stock: { type: Number, default: 10 },
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
