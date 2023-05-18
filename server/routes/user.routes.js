const {
  createNewUser,
  activateCreatedUser,
  userSignInController,
  verifyToken,
  getUser,
  refreshToken,
  getUserRoleOne,
} = require("../controllers/user.controllers");
const { validationHandler } = require("../middleware");
const {
  signUpValidator,
  signInValidator,
  nameSerchValidator,
} = require("../middleware/userAuth");

const router = require("express").Router();

router.post("/register", signUpValidator, validationHandler, createNewUser);
router.get("/email-activate", activateCreatedUser);
router.post(
  "/signin",
  signInValidator,
  validationHandler,
  userSignInController
);
router.post("/fetchUser", getUser);
router.post("/search-user-name", nameSerchValidator, getUserRoleOne);

module.exports = router;
