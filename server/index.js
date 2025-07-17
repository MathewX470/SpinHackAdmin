const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TeamModel = require("./models/Teams"); // ← updated import

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dinrajdinesh564:FOFzmsf4CsEV3ru7@cluster0.gttvq8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {}
    );
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
