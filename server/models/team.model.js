const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 3,
    },
    teamCategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("team_list", userSchema);
