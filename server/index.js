const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const TeamModel = require("./models/Teams");

const URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3001;

const app = express();

// Allow CORS from your frontend domain
app.use(
  cors({
    origin: "https://spin-hack-admin.vercel.app", // ✅ frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

connectDB();

app.get("/getTeams", async (req, res) => {
  try {
    const teams = await TeamModel.find();
    res.json(teams);
  } catch (err) {
    console.error("Error fetching teams:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
