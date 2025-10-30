import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      title: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  paymentMethod: { type: String, default: "QR Code" },
  paymentStatus: { type: String, default: "Pending" },
  orderStatus: { type: String, default: "Processing" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
