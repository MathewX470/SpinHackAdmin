const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TeamModel = require("./models/Teams"); // ← updated import
require("dotenv").config();
const URL = process.env.MONGODB_URL;



const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

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
