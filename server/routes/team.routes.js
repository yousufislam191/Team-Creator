const {
  createNewTeam,
  checkTeamName,
  getAllTeams,
  getSingleTeam,
  teamJoiningRequest,
  pendingRequests,
  getAddingMembersStatus,
  activeRequests,
  getRejectedMembersStatus,
  userPendingRequest,
  userAcceptingRequest,
  userRejectingRequest,
} = require("../controllers/team.controllers");
const { validationHandler } = require("../middleware");
const {
  teamNameValidator,
  teamListValidator,
  teamJoinRequestValidator,
} = require("../middleware/teamAuth");

const router = require("express").Router();

router.post(
  "/checkTeamName",
  teamNameValidator,
  validationHandler,
  checkTeamName
);
router.post(
  "/create-team",
  teamListValidator,
  validationHandler,
  createNewTeam
);
router.get("/fetchTeam", getAllTeams);
router.get("/fetchTeam/:_id", getSingleTeam);
router.post(
  "/member-team-joining/:teamID",
  teamJoinRequestValidator,
  validationHandler,
  teamJoiningRequest
);
router.get("/pending-user", pendingRequests, getAddingMembersStatus);
router.get("/active-user", activeRequests, getAddingMembersStatus);
router.get("/rejected-user", getRejectedMembersStatus);
router.get("/user-pending-request/:userId", userPendingRequest);
router.patch("/user-accepting-request", userAcceptingRequest);
router.delete("/user-rejecting-request", userRejectingRequest);

module.exports = router;
