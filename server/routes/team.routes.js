const {
  createNewTeam,
  checkTeamName,
  getAllTeams,
  getSingleTeam,
  teamJoiningRequest,
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

module.exports = router;
