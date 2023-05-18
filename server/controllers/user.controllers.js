const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const User = require("../models/users.model");
const sendEmail = require("./sendEmail.controllers");
const emailMessage = require("../models/mail.models");

// for create new user and send email activation notification
const createNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  // const { image } = req.file.filename;
  const token = JWT.sign(
    { name, email, password, role },
    process.env.USER_ACCOUNT_ACTIVATE_KEY,
    { expiresIn: "5m" }
  );

  try {
    const info = await sendEmail(emailMessage(email, token));
    // console.log(`"Accepted message: " ${info.accepted}`);
    if (info.accepted) {
      // console.log(image);
      return res.status(200).send({
        message: `A verification email has been sent to this email ${email} .
        Verification email will be expire after 5 Minutes.`,
        token: token,
      });
    } else {
      res.status(500).send({
        // error: error.message,
        message: "Email not sent Please try again!!",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
      message: "Something error. Please try again!!",
    });
  }
};

// activated user and save user info in database
const activateCreatedUser = async (req, res) => {
  const token = req.query.token;
  if (token) {
    JWT.verify(
      token,
      process.env.USER_ACCOUNT_ACTIVATE_KEY,
      (err, decodedToken) => {
        if (err) {
          return res.status(400).json({ message: "Link has been expired." });
        }
        const { name, email, password, role } = decodedToken;
        const hashpassword = bcrypt.hashSync(password);
        const newUser = new User({
          name,
          email,
          password: hashpassword,
          role,
        });
        try {
          newUser.save();
          return res.status(201).json([{ message: "Activated your account." }]);
        } catch (error) {
          return res.status(500).send({
            message: error.message,
            // errors,
          });
        }
      }
    );
  } else {
    return res.status(500).json({ error: "Something went wrong!!!" });
  }
};

// for signin
const userSignInController = async (req, res) => {
  const { email, password } = req.body;
  let existingUser, user;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "User not found!!.. Signup please" });
  } else {
    const isPasswordMatches = await bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordMatches) {
      return res.status(400).json({ message: "Wrong email and password" });
    } else {
      try {
        user = await User.findById(existingUser._id, "-password");
      } catch (error) {
        // res.status(500).send(error.message);
        return new Error(error);
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ user: user, message: "User signin successfully !!" });
    }
  }
};

const getUser = async (req, res) => {
  const { u_id } = req.body;
  let user;
  try {
    user = await User.findById(u_id, "-password");
  } catch (error) {
    // res.status(500).send(error.message);
    return new Error(error);
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
};

// for searching users by admin when admin will add members for a team
const getUserRoleOne = async (req, res) => {
  const { name } = req.body;
  const queryObject = { role: 0 };

  if (!name) {
    return res.status(400).json({ message: "User name is required" });
  } else {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // console.log(queryObject);
  let user;
  try {
    user = await User.find(queryObject, "-password");
  } catch (error) {
    // res.status(500).send(error.message);
    return new Error(error);
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
};

module.exports = {
  createNewUser,
  activateCreatedUser,
  userSignInController,
  getUser,
  getUserRoleOne,
};
