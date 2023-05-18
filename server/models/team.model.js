const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  userRole: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
});

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
    members: [memberSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("team_list", userSchema);
