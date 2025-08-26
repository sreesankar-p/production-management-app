// models/Invoice.ts
import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
    required: true
  },
  invoiceDate: {
    type: Date,
    required: true
  },
  percentage: {
    type: String,
    required: true
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true   // ✅ globally unique invoice number
  },
  finalAmount: {
    type: Number,
    required: true
  }
});

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", invoiceSchema);
