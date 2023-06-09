const ObjectId = require("mongodb").ObjectId;
const Team = require("../models/team.model");

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
    teamName: teamName,
    teamCategory: teamCategory,
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
    teamInfo = await Team.find({ _id: new ObjectId(id) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (teamInfo) {
    return res.status(200).json({ teamInfo });
  } else {
    return res.status(400).json({ message: "User not available" });
  }
};

const teamJoiningRequest = async (req, res) => {
  const teamID = req.params.teamID;
  const { userId, userRole } = req.body;

  let result;

  try {
    result = await Team.findById(teamID);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!result) {
    res.status(404).json({ message: "Team not found" });
  } else {
    let existingMemberRequest;
    try {
      existingMemberRequest = await Team.findOne({
        _id: teamID,
        "members.userId": userId,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    if (existingMemberRequest) {
      res.status(404).json({
        message: "Joining request already has been sent",
      });
    } else {
      const requestForAddNewMember = {
        userId,
        userRole,
      };
      result.members.push(requestForAddNewMember);
      try {
        result.save();
        return res.status(201).json({
          message: "Member joining request has been sent",
          result: result,
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
  }
};

const pendingRequests = async (req, res, next) => {
  req.status = false;
  req.rejected = false;
  next();
};

const activeRequests = async (req, res, next) => {
  req.status = true;
  req.rejected = false;
  next();
};

const getAddingMembersStatus = async (req, res) => {
  const status = req.status;
  const rejected = req.rejected;
  let result;

  try {
    result = await Team.aggregate([
      {
        $match: {
          "members.status": status,
          "members.rejected": rejected,
        },
      },
      {
        $unwind: "$members",
      },
      {
        $match: {
          "members.status": status,
          "members.rejected": rejected,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "members.userId",
          foreignField: "_id",
          as: "members.user",
        },
      },
      { $unwind: "$members.user" },
      {
        $project: {
          _id: "$_id",
          "members.user._id": 1,
          "members.user.name": 1,
          "members.user.email": 1,
          "members.userRole": 1,
          "members.status": 1,
          "members.rejected": 1,
          "members._id": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          members: {
            $push: "$members",
          },
        },
      },
    ]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (!result) {
    return res.status(404).json({ message: "There are no pending users" });
  } else {
    return res.status(200).json({ result: result });
  }
};

const getRejectedMembersStatus = async (req, res) => {
  let result;

  try {
    result = await Team.aggregate([
      { $match: { "members.rejected": true } },
      { $unwind: "$members" },
      { $match: { "members.rejected": true } },
      {
        $lookup: {
          from: "users",
          localField: "members.userId",
          foreignField: "_id",
          as: "members.user",
        },
      },
      { $unwind: "$members.user" },
      {
        $project: {
          _id: "$_id",
          "members.user._id": 1,
          "members.user.name": 1,
          "members.user.email": 1,
          "members.userRole": 1,
          "members.status": 1,
          "members.rejected": 1,
          "members._id": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          members: {
            $push: "$members",
          },
        },
      },
    ]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (!result) {
    return res.status(404).json({ message: "There are no rejected users" });
  } else {
    return res.status(200).json({ result });
  }
};

const signleUserTeamPendingRequest = async (req, res, next) => {
  req.userId = req.params.userId;
  req.status = false;
  next();
};

const signleUserTeamActive = async (req, res, next) => {
  req.userId = req.params.userId;
  req.status = true;
  next();
};

const userAddedTeam = async (req, res) => {
  const userId = req.userId;
  const status = req.status;

  let result;

  try {
    result = await Team.aggregate([
      {
        $match: {
          "members.userId": new ObjectId(userId),
          "members.status": status,
          "members.rejected": false,
        },
      },
      { $unwind: "$members" },
      {
        $match: {
          "members.userId": new ObjectId(userId),
          "members.status": status,
          "members.rejected": false,
        },
      },
      {
        $group: {
          _id: "$_id",
          teamName: { $first: "$teamName" },
          teamCategory: { $first: "$teamCategory" },
          members: { $push: "$members" },
        },
      },
    ]);

    if (!result) {
      return res.status(404).json({ message: "No request available" });
    } else {
      return res.status(200).json({ result });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userAcceptingRequest = async (req, res) => {
  const { memberId } = req.body;
  let result;

  try {
    result = await Team.updateOne(
      { "members._id": memberId },
      { $set: { "members.$.status": true } }
    );
    if (!result) {
      return res
        .status(404)
        .json({ message: "Something were wrong. Please try again" });
    } else {
      return res.status(200).json({ message: "You request has been accepted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userRejectingRequest = async (req, res) => {
  const { memberId } = req.body;
  let result;

  try {
    result = await Team.updateOne(
      { "members._id": memberId },
      { $set: { "members.$.rejected": true } }
    );
    if (!result) {
      return res
        .status(404)
        .json({ message: "Something were wrong. Please try again" });
    } else {
      return res
        .status(200)
        .json({ message: "You have declined this request from the team" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkTeamName,
  createNewTeam,
  getAllTeams,
  getSingleTeam,
  teamJoiningRequest,
  pendingRequests,
  getAddingMembersStatus,
  activeRequests,
  getRejectedMembersStatus,
  signleUserTeamPendingRequest,
  signleUserTeamActive,
  userAddedTeam,
  userAcceptingRequest,
  userRejectingRequest,
};
