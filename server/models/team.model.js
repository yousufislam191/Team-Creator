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
    members: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "users",
          unique: true,
        },
        userRole: {
          type: String,
          // required: true,
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
