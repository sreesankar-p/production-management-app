// models/Offer.ts
import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  offerDate: {
    type: Date,
    required: true
  },
  offerNo: {
    type: String,
    required: true,
    unique: true   // ✅ now this is globally unique across all offers
  },
  work: {
    type: String,
    required: true
  },
  paymentTerms: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  poDetails: {
    poNumber: String,
    poDate: Date,
    workPaymentTerm: String,
    poAmount: Number
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Offer ||
  mongoose.model("Offer", offerSchema);
