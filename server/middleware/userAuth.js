const { check } = require("express-validator");
const createError = require("http-errors");
// const multer = require("multer");

const User = require("../models/users.model");

const signUpValidator = [
  // check("image")
  //   // .trim()
  //   .notEmpty()
  //   .withMessage("Image is missing"),
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is missing")
    .isLength({ min: 3 })
    .withMessage("Invalid name")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name should only contain alphabet and space"),
  check("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Invalid email address")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage("Invalid email address")
    .custom(async (value) => {
      try {
        const existingUser = await User.findOne({ email: value });
        if (existingUser) {
          throw createError("Email already exists!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8 })
    .withMessage("password must have at least 8 characters")
    .isStrongPassword()
    .withMessage(
      "Password is not a strong. Must be one uppercase, lowercase, number and special characters"
    ),
  check("role")
    .trim()
    .notEmpty()
    .withMessage("Role is missing")
    .matches(/\d/)
    .withMessage("Role must be digits"),
];

const signInValidator = [
  check("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Invalid email address")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage("Invalid email address"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8 })
    .withMessage("Invalid password"),
];

// // file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../assets/userImages/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const uploadFile = multer({
//   storage: storage,
//   //  limits: { fileSize: 10 * 1024 * 1024 }
// });

module.exports = { signUpValidator, signInValidator };
