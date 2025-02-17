import mongoose from "mongoose";

const LoanApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  loanType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const LoanApplication = mongoose.model("LoanApplication", LoanApplicationSchema);

export default LoanApplication;
