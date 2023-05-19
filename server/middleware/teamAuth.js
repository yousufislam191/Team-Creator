const { check } = require("express-validator");
const createError = require("http-errors");

const Team = require("../models/team.model");

const teamNameValidator = [
  check("teamName")
    .trim()
    .notEmpty()
    .withMessage("Team Name is missing")
    .isLength({ min: 3 })
    .withMessage("Invalid name, must be at least 3 characters"),
];

const teamListValidator = [
  check("teamName")
    .trim()
    .notEmpty()
    .withMessage("Team Name is missing")
    .isLength({ min: 3 })
    .withMessage("Invalid name, must be at least 3 characters")
    .custom(async (value) => {
      try {
        const existingTeam = await Team.findOne({ teamName: value });
        if (existingTeam) {
          throw createError(
            "Team already exists! Please try with a different team name"
          );
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("teamCategory")
    .trim()
    .notEmpty()
    .withMessage("Team Category is missing"),
];

const teamJoinRequestValidator = [
  check("teamID").trim().notEmpty().withMessage("Team id is missing"),
  check("userId").trim().notEmpty().withMessage("User Id is missing"),
  check("userRole").trim().notEmpty().withMessage("User role is missing"),
];
module.exports = {
  teamNameValidator,
  teamListValidator,
  teamJoinRequestValidator,
};
