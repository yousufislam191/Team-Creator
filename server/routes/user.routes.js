const {
  createNewUser,
  activateCreatedUser,
  userSignInController,
  verifyToken,
  getUser,
  refreshToken,
} = require("../controllers/user.controllers");
const { validationHandler } = require("../middleware");
const { signUpValidator, signInValidator } = require("../middleware/userAuth");

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

module.exports = router;
