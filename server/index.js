const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const TeamModel = require("./models/Teams");

const URL = process.env.MONGODB_URL;
const PORT =3001;

const app = express();

// Enable CORS for all routes
app.use(cors());


app.use(express.json());

// Connect to MongoDB
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

// Get teams endpoint
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
