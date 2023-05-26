const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("./config/db");

const userRouter = require("./routes/user.routes");
const teamRouter = require("./routes/team.routes");
const app = express();

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
// app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(cors({ credentials: true, origin: "https://team-creator.vercel.app" }));
// app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" })); // for localhost origin
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/team", teamRouter);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Something is wrong</h1>");
});
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
