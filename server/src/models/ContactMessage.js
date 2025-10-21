import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: String,
  phone: String,
  message: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("ContactMessage", ContactMessageSchema);
