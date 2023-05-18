const Team = require("../models/team.model");
const User = require("../models/users.model");

const checkTeamName = async (req, res) => {
  const { teamName } = req.body;
  let existingTeam;
  try {
    existingTeam = await Team.findOne({ teamName: teamName });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (existingTeam) {
    return res.status(400).json({
      message: "This team already exists!!! Please use a different team name",
    });
  } else {
    return res.status(200).json({ message: "Team Name is available" });
  }
};

const createNewTeam = async (req, res) => {
  const { teamName, teamCategory } = req.body;
  const newTeam = new Team({
    teamName,
    teamCategory,
  });

  try {
    newTeam.save();
    return res.status(201).json({ message: "Team is created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllTeams = async (req, res) => {
  let teamlist;
  try {
    teamlist = await Team.find({}, { teamName: 1, teamCategory: 1 });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (teamlist) {
    return res.status(200).json({
      teamlist,
    });
  } else {
    return res.status(400).json({ message: "There are no team available" });
  }
};

const getSingleTeam = async (req, res) => {
  const id = req.params._id;
  let teamInfo;
  try {
    teamInfo = await Team.find({ _id: id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (teamInfo) {
    return res.status(200).json({ teamInfo });
  } else {
    return res.status(400).json({ message: "User not available" });
  }
};

module.exports = { checkTeamName, createNewTeam, getAllTeams, getSingleTeam };
