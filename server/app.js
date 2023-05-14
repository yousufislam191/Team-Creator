const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("multer");
require("./config/db");

const userRouter = require("./routes/user.routes");
// const multer = require("multer");
const app = express();
app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./assets/userImages/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const uploadFile = multer({
//   storage: storage,
//   //  limits: { fileSize: 10 * 1024 * 1024 }
// });

app.use("/api/user", userRouter);

// app.get("/", (req, res) => {
//   res.status(200).send("server home route");
// });
app.use((req, res, next) => {
  res.status(404).send("Page not found");
  res.end();
});
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("There was a problem!");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("Server error !!!");
    }
  }
});

module.exports = app;
