const {
  createNewTeam,
  checkTeamName,
  getAllTeams,
} = require("../controllers/team.controllers");
const { validationHandler } = require("../middleware");
const {
  teamNameValidator,
  teamListValidator,
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

module.exports = router;
