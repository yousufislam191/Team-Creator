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
    members: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "users",
        },
        userRole: {
          type: String,
        },
        status: {
          type: Boolean,
          default: false,
        },
        rejected: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("team_list", userSchema);
