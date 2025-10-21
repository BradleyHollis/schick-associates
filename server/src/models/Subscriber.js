import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  firstName: String,
  lastName: String,
  source: String, // e.g. "home", "contact", "footer"
  status: {
    type: String,
    enum: ["pending", "confirmed", "unsubscribed"],
    default: "pending"
  },
  confirmToken: String,
  confirmedAt: Date,
  unsubscribedAt: Date
}, { timestamps: true });

export default mongoose.model("Subscriber", SubscriberSchema);
