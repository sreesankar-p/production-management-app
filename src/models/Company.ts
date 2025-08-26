// models/Company.ts
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  registeredId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default mongoose.models.Company ||
  mongoose.model("Company", companySchema);
