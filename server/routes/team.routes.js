const {
  createNewTeam,
  checkTeamName,
} = require("../controllers/team.controllers");
const { validationHandler } = require("../middleware");
const { teamNameValidator } = require("../middleware/teamAuth");

const router = require("express").Router();

router.post(
  "/checkTeamName",
  teamNameValidator,
  validationHandler,
  checkTeamName
);
// router.post(
//   "/create-team",
//   teamListValidator,
//   validationHandler,
//   createNewTeam
// );

module.exports = router;
