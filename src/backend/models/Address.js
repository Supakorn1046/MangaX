import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: String,
  lastName: String,
  address: String,
  phone: String,
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Address", addressSchema);
