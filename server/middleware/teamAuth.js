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

const teamCategoryValidator = [
  check("teamCategory")
    .trim()
    .notEmpty()
    .withMessage("Team Category is missing"),
];
module.exports = { teamNameValidator, teamCategoryValidator };
