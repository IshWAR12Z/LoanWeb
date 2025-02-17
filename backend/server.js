import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";
import LoanApplication from "./models/Loanapplication.js";
import Card from "./models/card.js";


dotenv.config();
// Debugging

const app = express();
app.use(express.json()); // Middleware for JSON parsing
app.use(cors());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));


// API Route to Fetch Cards
app.get("/api/cards", async (req, res) => {
  try {
    const BASE_URL = "http://localhost:5000/";
    const cards = await Card.find();
    const updatedCards = cards.map((card) => ({
      ...card._doc,
      img: card.img.startsWith("http") ? card.img : BASE_URL + card.img,
    }));
    res.json(updatedCards);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


app.post("/api/apply", async (req, res) => {
  try {
    console.log("Received application data:", req.body); // ✅ Debugging step
    const { name, email, phone, amount, loanType } = req.body;

    if (!name || !email || !phone || !amount || !loanType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newApplication = new LoanApplication({
      name,
      email,
      phone,
      amount,
      loanType,
    });

    await newApplication.save();
    console.log("Application saved successfully");
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error saving loan application:", error);
    res.status(500).json({ error: "Internal server error" });
  }

});

app.get("/api/admin/loans", async (req, res) => {
  try {
    const applications = await LoanApplication.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/api/admin/loans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete request received for ID:", id); // ✅ Debug log

    const deletedApplication = await LoanApplication.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    console.error("Error deleting application:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
