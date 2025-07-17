const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true },
    teamNameLower: { type: String, required: true, unique: true },
    members: [String],
    topic: { type: String, required: true },
  },
  { timestamps: true }
);

const TeamModel = mongoose.model("Team", teamSchema, "teams"); // ← Note: collection name is 'teams'
module.exports = TeamModel;
